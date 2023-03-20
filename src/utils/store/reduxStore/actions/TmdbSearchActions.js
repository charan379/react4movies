export const updateTmdbSearch = (queryObject) => {
    return {
      type: "UPDATE_TMDB_SEARCH",
      payload: queryObject,
    };
  };
  