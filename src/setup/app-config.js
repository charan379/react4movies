const TmdbConfig = {
  tmdbApiKey: process.env.REACT_APP_TMDB_API,
  tmdbApiUrl: process.env.REACT_APP_TMDB_API_URL,
  tmdbImagesUrl: process.env.REACT_APP_TMDB_API_IMAGES_URL,
  tmdbLanguage: process.env.REACT_APP_TMDB_API_LANGUAGE,
  tmdbRegion: process.env.REACT_APP_TMDB_API_REGION,
};

const AppConfig = {
  MOVIEBUNKERS_API: process.env.REACT_APP_MOVIEBUNKERS_API,
  MOVIEBUNKERS_IMAGES: process.env.REACT_APP_MOVIEBUNKERS_IMAGES,
  TMDB_API: process.env.REACT_APP_TMDB_API_WRAPPER,
  TORRENT_API: process.env.REACT_APP_TORRENT_API,
  GUEST_USERNAME: process.env.REACT_APP_GUEST_USERNAME,
  GUEST_PASSWORD: process.env.REACT_APP_GUEST_PASSWORD,
  GUEST_TOKEN: process.env.REACT_APP_GUEST_TOKEN,
};
export { TmdbConfig, AppConfig };
