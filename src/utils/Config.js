const TmdbConfig = {
  tmdbApiKey: process.env.REACT_APP_TMDB_API,
  tmdbApiUrl: process.env.REACT_APP_TMDB_API_URL,
  tmdbImagesUrl: process.env.REACT_APP_TMDB_API_IMAGES_URL,
  tmdbLanguage: process.env.REACT_APP_TMDB_API_LANGUAGE,
  tmdbRegion: process.env.REACT_APP_TMDB_API_REGION,
};

const Config = {
  MOVIEBUNKERS_API: process.env.REACT_APP_MOVIEBUNKERS_API,
  TMDB_API: process.env.REACT_APP_TMDB_API_WRAPPER,
  GUEST_USERNAME: process.env.REACT_APP_GUEST_USERNAME,
  GUEST_PASSWORD: process.env.REACT_APP_GUEST_PASSWORD,
};
export { TmdbConfig, Config };
