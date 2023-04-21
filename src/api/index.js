export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "55c58e4bc2msh64fad2fc876b566p1d22f8jsn42fe62f3330f",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const locationOptions = {
  method: "GET",
  params: { radius: "100" },
  headers: {
    "X-RapidAPI-Key": "55c58e4bc2msh64fad2fc876b566p1d22f8jsn42fe62f3330f",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

// export const WEATHER_API_KEY = "1fa9ff4126d95b8db54f3897a208e91c";

export const WEATHER_API_KEY = "6a62ba0e5000886cf11de299fcef3eb4";
