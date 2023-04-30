export const updateTitle = (titleObj) => {
    return {
        type: "SET_TITLE",
        payload: titleObj,
    };
};

export const removeTitle = () => {
    return {
        type: "REMOVE_TITLE",
    };
};
