const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

export interface ApodItem {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
}

const NasaModel = {
  // Photo du jour
  getToday: async (): Promise<ApodItem> => {
    const res = await fetch(`${BASE_URL}?api_key=${NASA_API_KEY}`);
    if (!res.ok) throw new Error(`NASA API error: ${res.status}`);
    return res.json();
  },

  // N dernières photos (max 100)
  getLast: async (count: number = 10): Promise<ApodItem[]> => {
    const res = await fetch(
      `${BASE_URL}?api_key=${NASA_API_KEY}&count=${count}`,
    );
    if (!res.ok) throw new Error(`NASA API error: ${res.status}`);
    return res.json();
  },

  // Photos sur une période
  getRange: async (start: string, end: string): Promise<ApodItem[]> => {
    const res = await fetch(
      `${BASE_URL}?api_key=${NASA_API_KEY}&start_date=${start}&end_date=${end}`,
    );
    if (!res.ok) throw new Error(`NASA API error: ${res.status}`);
    return res.json();
  },
};

export default NasaModel;
