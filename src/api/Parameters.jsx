export default {
  OMDb: {
    apikey: "apikey=ae63f570",
    url: "http://www.omdbapi.com/?",
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
    url_v3: "https://api.themoviedb.org/3/",
    url_v4: "https://api.themoviedb.org/4/",
    api_key: "api_key=5cbcf6f5d3e8e12a4226fd2675b7efbb",
    language: "language=es",
    multi_search: "search/multi",
    page: "page=",
    query: "query=",
    list: "list",
    img: "https://image.tmdb.org/t/p/original",
    include_adult: "include_adult=false",
    movie: "movie/",
    tv: "tv/",
  },
};
