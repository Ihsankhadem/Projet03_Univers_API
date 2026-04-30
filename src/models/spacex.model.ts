const BASE_URL = "https://api.spacexdata.com/v5";

export interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  links: {
    patch: { small: string | null; large: string | null };
    webcast: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  rocket: string;
  flight_number: number;
}

const SpaceXModel = {
  // Prochains lancements
  getUpcoming: async (): Promise<SpaceXLaunch[]> => {
    const res = await fetch(`${BASE_URL}/launches/upcoming`);
    if (!res.ok) throw new Error(`SpaceX API error: ${res.status}`);
    return res.json();
  },

  // Derniers lancements
  getLatest: async (limit: number = 10): Promise<SpaceXLaunch[]> => {
    const res = await fetch(`${BASE_URL}/launches/past`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: {},
        options: {
          limit,
          sort: { date_unix: "desc" },
        },
      }),
    });
    if (!res.ok) throw new Error(`SpaceX API error: ${res.status}`);
    const data = await res.json();
    return data.docs;
  },

  // Un lancement par ID
  getById: async (id: string): Promise<SpaceXLaunch> => {
    const res = await fetch(`${BASE_URL}/launches/${id}`);
    if (!res.ok) throw new Error(`SpaceX API error: ${res.status}`);
    return res.json();
  },
};

export default SpaceXModel;
