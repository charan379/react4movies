const initialState = {
    search: "",
    genre: "",
    language: "",
    movie: 1,
    tv: 1,
    starred: 0,
    favourite: 0,
    seen: 0,
    "age.gte": 0,
    "age.lte": 26,
    country: "IN",
    sort_by: "createdAt.desc",
    limit: 20,
    pageNo: 1,
    minimal:true,

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