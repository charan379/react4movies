const initialState = {
    query: "",
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
        default:
            return state;
    }
};

export default TmdbSearchReducer;
