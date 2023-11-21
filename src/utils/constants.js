export const envVars = import.meta.env

export const TMDB = {
  url: "https://api.themoviedb.org",
  url_v3: "https://api.themoviedb.org/3",
  url_v4: "https://api.themoviedb.org/4",
  language: "language=es",
  multi_search: "/search/multi",
  page: "page=",
  query: "query=",
  list: "list",
  url_img: "https://image.tmdb.org/t/p",
  include_adult: "include_adult=false",
}

export const SUPABASE = {
  url: envVars.VITE_SUPABASE_URL,
  key: envVars.VITE_SUPABASE_KEY,
  url_storage: `${envVars.VITE_SUPABASE_URL}/storage/v1/object/public/`,
}

export const mediaTranslations = {
  "Rumored": "Rumoreada",
  "Planned": "Planificada",
  "In production": "En producción",
  "Post production": "En pos producción",
  "Released": "Publicada",
  "Canceled": "Cancelada",
  "Returning Series": "Regresará más adelante",
  "Ended": "Finalizada",
  "Acting": "Actuación",
  "Production": "Producción",
  "Lighting": "Iluminación",
  "movie": "Película",
  "tv": "Serie",
}
