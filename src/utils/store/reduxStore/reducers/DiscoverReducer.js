const initialState = {
  query: "",
  type: "",
  year: "",
};

const DiscoverReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_DISCOVER_QUERY": {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
};

export default DiscoverReducer;
