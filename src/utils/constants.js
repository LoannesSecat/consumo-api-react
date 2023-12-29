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
  "Scripted": "Escrita (guión)",
}

export const errorMsg = {
  "Email not confirmed": "La cuenta de correo no ha sido verificada",
  "Invalid login credentials": "Las credenciales son inválidas",
  "Password recovery requires an email": "Se requiere el correo registrado para recuperar la contraseña",
  "For security purposes, you can only request this once every 60 seconds": "Solo puedes hacer una petición de cambio de contraseña cada 60 segundos",
  "User already registered": "El correo ya está en uso",
  "duplicate key value violates unique constraint \"bucketid_objname\"": "El nombre del archivo ya está registrado",
  "A user with this email address has already been registered": "Un usuario ya se ha registrado con este correo",
  "Unable to validate email address: invalid format": "Formato de correo inválido",
  "Password should be at least 6 characters": "La contraseña debe tener más de 6 caracteres",
  "New password should be different from the old password.": "La nueva contraseña debe ser diferente a la anterior",
}