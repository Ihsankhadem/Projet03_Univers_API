import {
  translationCache,
  spaceflightCache,
} from "../services/cache.service.js";

import { translate } from "../services/translate.service.js";

const BASE_URL = "https://api.spaceflightnewsapi.net/v4";

export interface SpaceArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
}

export interface SpaceflightResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SpaceArticle[];
}

/* =========================
   FETCH SAFE
========================= */

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

/* =========================
   TRANSLATION CORE
========================= */

async function translateIfNeeded(text: string, key: string) {
  const cached = translationCache.get(key);
  if (cached) return cached;

  try {
    const translated = await translate(text);
    translationCache.set(key, translated);
    return translated;
  } catch {
    return text;
  }
}

/* =========================
   TRANSLATE ARTICLE (FULL)
========================= */

async function translateArticle(article: SpaceArticle): Promise<SpaceArticle> {
  const [title, summary] = await Promise.all([
    translateIfNeeded(article.title, `title_${article.id}`),
    translateIfNeeded(article.summary, `summary_${article.id}`),
  ]);

  return {
    ...article, // 👈 ARTICLE COMPLET CONSERVÉ
    title,
    summary,
  };
}

/* =========================
   MODEL
========================= */

const SpaceflightModel = {
  /**
   * LIST → FAST + translated (light)
   */
  async getArticles(limit = 25, offset = 0): Promise<SpaceflightResponse> {
    const cacheKey = `articles_${limit}_${offset}`;

    const cached = spaceflightCache.get(cacheKey);
    if (cached) return cached as SpaceflightResponse;

    const res = await fetchWithTimeout(
      `${BASE_URL}/articles/?limit=${limit}&offset=${offset}&ordering=-published_at`,
    );

    if (!res.ok) throw new Error(`Spaceflight API error: ${res.status}`);

    const data: SpaceflightResponse = await res.json();

    // 🔥 traduction contrôlée (pas de burst)
    const translatedResults: SpaceArticle[] = [];

    for (const article of data.results) {
      translatedResults.push(await translateArticle(article));
    }

    const finalData = {
      ...data,
      results: translatedResults,
    };

    spaceflightCache.set(cacheKey, finalData, 120); // cache court

    return finalData;
  },

  /**
   * SEARCH → same logic
   */
  async search(query: string, limit = 25): Promise<SpaceflightResponse> {
    const cacheKey = `search_${query}_${limit}`;

    const cached = spaceflightCache.get(cacheKey);
    if (cached) return cached as SpaceflightResponse;

    const res = await fetchWithTimeout(
      `${BASE_URL}/articles/?search=${encodeURIComponent(query)}&limit=${limit}&ordering=-published_at`,
    );

    if (!res.ok) throw new Error(`Spaceflight API error: ${res.status}`);

    const data: SpaceflightResponse = await res.json();

    const translatedResults: SpaceArticle[] = [];

    for (const article of data.results) {
      translatedResults.push(await translateArticle(article));
    }

    const finalData = {
      ...data,
      results: translatedResults,
    };

    spaceflightCache.set(cacheKey, finalData, 120);

    return finalData;
  },

  /**
   * DETAIL → full + translated
   */
  async getById(id: number): Promise<SpaceArticle> {
    const cacheKey = `article_${id}`;

    const cached = spaceflightCache.get(cacheKey);
    if (cached) return cached as SpaceArticle;

    const res = await fetchWithTimeout(`${BASE_URL}/articles/${id}/`);

    if (!res.ok) throw new Error(`Spaceflight API error: ${res.status}`);

    const article: SpaceArticle = await res.json();

    const translated = await translateArticle(article);

    spaceflightCache.set(cacheKey, translated, 3600); // cache long

    return translated;
  },
};

export default SpaceflightModel;
