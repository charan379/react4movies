export const updateTmdbSearch = (queryObject) => {
  return {
    type: "UPDATE_TMDB_SEARCH",
    payload: queryObject,
  };
};

export const resetTmdbSearch = () => {
  return {
    type: "RESET_TMDB_SEARCH",
  };
};
