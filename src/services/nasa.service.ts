// src/services/nasa.service.ts
const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

const fetchNASA = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`NASA API error: ${res.status}`);
  }

  return res.json();
};

const NasaModel = {
  getToday: () => fetchNASA(`${BASE_URL}?api_key=${NASA_API_KEY}`),

  getLast: (count: number) =>
    fetchNASA(`${BASE_URL}?api_key=${NASA_API_KEY}&count=${count}`),

  getRange: (start: string, end: string) =>
    fetchNASA(
      `${BASE_URL}?api_key=${NASA_API_KEY}&start_date=${start}&end_date=${end}`,
    ),
};

export default NasaModel;
