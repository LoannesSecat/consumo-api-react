export default {
  OMDb: {
    key: `apikey=${import.meta.env.VITE_OMDB_API_KEY}`,
    url: "http://www.omdbapi.com/",
    search_all: "s=all",
    type: {
      movie: "movie",
      series: "series",
      episode: "episode",
    },
    search_by_id: "i=",
    search_by_title: "t=",
    search_by_year: "y=",
    page: "page=",
    response_type: {
      json: "json",
      xml: "xml",
    },
    plot: {
      short: "short",
      full: "full",
    },
  },

  TMDb: {
    url: "https://api.themoviedb.org",
    url_v3: "https://api.themoviedb.org/3/",
    url_v4: "https://api.themoviedb.org/4/",
    key: `api_key=${import.meta.env.VITE_TMDB_KEY}`,
    language: "language=es",
    multi_search: "search/multi",
    page: "page=",
    query: "query=",
    list: "list",
    url_img: "https://image.tmdb.org/t/p/",
    include_adult: "include_adult=false",
    movie: "movie/",
    tv: "tv/",
    person: "person/",
  },

  SUPABASE: {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_KEY,
  },
};
