const initialState = {
    progress: 60,
}

const ProgressReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "INC_PROGRESS_20": {
            return { ...state, progress: state.progress + 20 };
        }
        case "INC_PROGRESS_CUSTOM": {
            return { ...state, progress: state.progress + payload };
        }
        case "COMPELTE_PROGRESS": {
            return {
                ...initialState, progress: 100
            }
        }
        case "RESET_PROGRESS": {
            return {
                ...initialState, progress: 0
            }
        }
        default:
            return state;
    }
};

export default ProgressReducer;