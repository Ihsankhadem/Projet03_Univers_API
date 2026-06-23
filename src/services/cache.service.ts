// Cache en mémoire — évite de retraduire les mêmes articles
// Tant que le serveur tourne, les traductions sont mémorisées
// src/services/cache.service.ts

const cache = new Map<string, string>();

const apiCache = new Map<
  string,
  {
    data: unknown;
    expires: number;
  }
>();

export const translationCache = {
  get: (key: string) => cache.get(key),

  set: (key: string, value: string) => {
    cache.set(key, value);
  },

  has: (key: string) => cache.has(key),

  size: () => cache.size,
};

export const spaceflightCache = {
  get: (key: string) => {
    const item = apiCache.get(key);

    if (!item) return null;

    if (Date.now() > item.expires) {
      apiCache.delete(key);
      return null;
    }

    return item.data;
  },

  set: (key: string, data: unknown, ttlMinutes = 10) => {
    apiCache.set(key, {
      data,
      expires: Date.now() + ttlMinutes * 60 * 1000,
    });
  },
};
