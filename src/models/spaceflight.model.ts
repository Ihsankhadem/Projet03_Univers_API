import { translate } from "../services/translate.service";
import { translationCache } from "../services/cache.service";

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

async function translateArticle(article: SpaceArticle): Promise<SpaceArticle> {
  const titleKey = `title_${article.id}`;
  const summaryKey = `summary_${article.id}`;

  let title = translationCache.get(titleKey);
  let summary = translationCache.get(summaryKey);

  if (!title) {
    title = await translate(article.title);
    translationCache.set(titleKey, title);
  }
  if (!summary) {
    summary = await translate(article.summary);
    translationCache.set(summaryKey, summary);
  }

  return { ...article, title, summary };
}

async function translateArticles(
  articles: SpaceArticle[],
): Promise<SpaceArticle[]> {
  return Promise.all(articles.map(translateArticle));
}

const SpaceflightModel = {
  getArticles: async (limit = 12, offset = 0): Promise<SpaceflightResponse> => {
    const res = await fetch(
      `${BASE_URL}/articles/?limit=${limit}&offset=${offset}&ordering=-published_at`,
    );
    if (!res.ok) throw new Error(`Spaceflight API error: ${res.status}`);
    const data: SpaceflightResponse = await res.json();
    data.results = await translateArticles(data.results);
    return data;
  },

  search: async (query: string, limit = 12): Promise<SpaceflightResponse> => {
    const res = await fetch(
      `${BASE_URL}/articles/?search=${encodeURIComponent(query)}&limit=${limit}&ordering=-published_at`,
    );
    if (!res.ok) throw new Error(`Spaceflight API error: ${res.status}`);
    const data: SpaceflightResponse = await res.json();
    data.results = await translateArticles(data.results);
    return data;
  },

  getById: async (id: number): Promise<SpaceArticle> => {
    const res = await fetch(`${BASE_URL}/articles/${id}/`);
    if (!res.ok) throw new Error(`Spaceflight API error: ${res.status}`);
    const article: SpaceArticle = await res.json();
    return translateArticle(article);
  },
};

export default SpaceflightModel;
