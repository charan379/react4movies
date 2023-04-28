export const updateTmdbTitle = (titleObj) => {
    return {
        type: "SET_TMDB_TITLE",
        payload: titleObj,
    };
};

export const removeTmdbTitle = () => {
    return {
        type: "REMOVE_TMDB_TITLE",
    };
};
