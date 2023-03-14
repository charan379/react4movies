const initialState = {
    search: "",
    movie: 1,
    tv: 1,
    seen: 0,
    favourite: 0,
    starred: 0,
    limit: 20,
    minimal:true,
    pageNo: "",
};


const CollectionSearchReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "UPDATE_COLLECTION_SEARCH": {
            return { ...state, ...payload };
        }
        default:
            return state;
    }
};

export default CollectionSearchReducer;