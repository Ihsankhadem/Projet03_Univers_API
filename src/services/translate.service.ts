// MyMemory API — gratuit, pas de limite par minute
// src/services/translate.service.ts
const EMAIL = "contact@univers.fr";

export async function translate(text: string): Promise<string> {
  if (!text?.trim()) return "";
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr&de=${EMAIL}`;
    const res = await fetch(url);
    if (!res.ok) return text;
    const data = await res.json();
    return data.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

export async function translateBatch(texts: string[]): Promise<string[]> {
  return Promise.all(texts.map((text) => translate(text)));
}
