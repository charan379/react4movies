export const increaseProgressBy20 = () => {
    return {
        type: "INC_PROGRESS_20",
    };
};

export const increaseProgressByCustom = (value) => {
    return {
        type: "INC_PROGRESS_CUSTOM",
        payload: value
    };
};

export const competeProgress = () => {
    return {
        type: "COMPELTE_PROGRESS",
    };
};

export const resetProgress = () => {
    return {
        type: "RESET_PROGRESS",
    };
};