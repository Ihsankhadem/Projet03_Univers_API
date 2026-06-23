import {
  translationCache,
  spaceflightCache,
} from "../services/cache.service.js";

import { translate } from "../services/translate.service.js";

const BASE_URL = "https://api.spaceflightnewsapi.net/v4";

/* =========================
   TYPES
========================= */

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
   FETCH TIMEOUT SAFE
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
   TRANSLATION (DETAIL ONLY)
========================= */

async function translateArticle(article: SpaceArticle): Promise<SpaceArticle> {
  const titleKey = `title_${article.id}`;
  const summaryKey = `summary_${article.id}`;

  let title = translationCache.get(titleKey);
  let summary = translationCache.get(summaryKey);

  if (!title) {
    try {
      title = await translate(article.title);
      translationCache.set(titleKey, title);
    } catch {
      title = article.title;
    }
  }

  if (!summary) {
    try {
      summary = await translate(article.summary);
      translationCache.set(summaryKey, summary);
    } catch {
      summary = article.summary;
    }
  }

  return {
    ...article,
    title,
    summary,
  };
}

/* =========================
   MODEL
========================= */

const SpaceflightModel = {
  /**
   * LIST PAGE → ultra fast (NO translation)
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

    // 🔥 TRADUCTION LISTE
    const translated = await Promise.all(
      data.results.map((article) => translateArticle(article)),
    );

    const finalData = {
      ...data,
      results: translated,
    };

    spaceflightCache.set(cacheKey, finalData, 60);

    return finalData;
  },

  /**
   * SEARCH → fast (NO translation)
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

    const translated = await Promise.all(
      data.results.map((article) => translateArticle(article)),
    );

    const finalData = {
      ...data,
      results: translated,
    };

    spaceflightCache.set(cacheKey, finalData, 60);

    return finalData;
  },

  /**
   * DETAIL PAGE → translated
   */
  async getById(id: number): Promise<SpaceArticle> {
    const cacheKey = `article_${id}`;

    const cached = spaceflightCache.get(cacheKey);
    if (cached) return cached as SpaceArticle;

    const res = await fetchWithTimeout(`${BASE_URL}/articles/${id}/`);

    if (!res.ok) throw new Error(`Spaceflight API error: ${res.status}`);

    const article: SpaceArticle = await res.json();

    const translated = await translateArticle(article);

    spaceflightCache.set(cacheKey, translated, 60);

    return translated;
  },
};

export default SpaceflightModel;
