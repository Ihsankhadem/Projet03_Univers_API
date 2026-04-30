// Cache en mémoire — évite de retraduire les mêmes articles
// Tant que le serveur tourne, les traductions sont mémorisées

const cache = new Map<string, string>();

export const translationCache = {
  get: (key: string): string | undefined => cache.get(key),
  set: (key: string, value: string): void => {
    cache.set(key, value);
  },
  has: (key: string): boolean => cache.has(key),
  size: (): number => cache.size,
};
