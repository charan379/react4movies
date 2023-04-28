const initialState = {
  query: "the",
  type: "",
  year: "",
  pageNo: "",
};

const TmdbSearchReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_TMDB_SEARCH": {
      return { ...state, ...payload };
    }
    case "RESET_TMDB_SEARCH": {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export default TmdbSearchReducer;
