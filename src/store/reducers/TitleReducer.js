const initialState = {};

const TitleReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_TITLE": {
            return { ...state, ...payload };
        }
        case "REMOVE_TITLE": {
            return { ...initialState }
        }
        default:
            return state;
    }
};

export default TitleReducer;
