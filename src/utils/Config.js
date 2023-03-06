const TmdbConfig = {
  tmdbApiKey: process.env.REACT_APP_TMDB_API,
  tmdbApiUrl: process.env.REACT_APP_TMDB_API_URL,
  tmdbImagesUrl: process.env.REACT_APP_TMDB_API_IMAGES_URL,
  tmdbLanguage: process.env.REACT_APP_TMDB_API_LANGUAGE,
  tmdbRegion: process.env.REACT_APP_TMDB_API_REGION,
};

const Config = {
  SERVER: process.env.REACT_APP_SERVER,
};
export { TmdbConfig, Config };
