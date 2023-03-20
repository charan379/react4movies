const initialState = {};

const TmdbTitleReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_TMDB_TITLE": {
            return { ...state, ...payload };
        }
        case "REMOVE_TMDB_TITLE": {
            return { ...initialState }
        }
        default:
            return state;
    }
};

export default TmdbTitleReducer;
