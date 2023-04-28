export const updateCollectionSearch = (queryObject) => {
  return {
    type: "UPDATE_COLLECTION_SEARCH",
    payload: queryObject,
  };
};

export const resetCollectionSearch = () => {
  return {
    type: "RESET_COLLECTION_SEARCH",
  };
};
