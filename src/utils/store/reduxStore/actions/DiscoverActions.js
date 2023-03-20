export const updateDiscoverQuery = (queryObject) => {
  return {
    type: "UPDATE_DISCOVER_QUERY",
    payload: queryObject,
  };
};
