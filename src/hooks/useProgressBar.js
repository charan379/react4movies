import { useDispatch, useSelector } from "react-redux"
import { increaseProgressByCustom, increaseProgressBy20, competeProgress, resetProgress } from "store/actions/ProgressActions";


const useProgressBar = () => {
    const dispatch = useDispatch();

    const currentProgress = useSelector((state) => state.ProgressReducer);

    const increaseProgress20 = () => {
        if (currentProgress.progress >= 100) {
            dispatch(resetProgress);
        } else {
            dispatch(increaseProgressBy20())
        }
    };

    const increaseProgressCustom = (value) => {
        if (currentProgress.progress >= 100) {
            dispatch(resetProgress);
        } else {
            dispatch(increaseProgressByCustom(value))
        }
    };

    const completeProgressBar = () => dispatch(competeProgress());

    const resetProgressBar = () => dispatch(resetProgress());

    return { currentProgress, increaseProgress20, increaseProgressCustom, completeProgressBar, resetProgressBar }

}

export { useProgressBar };