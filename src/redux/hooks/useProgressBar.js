import { useDispatch, useSelector } from "react-redux";
import { completeProgress, increaseProgressBy20, increaseProgressByCustom, resetProgress } from "../features/progressbar/progressBarSlice";


export function useProgressBar() {
    const progress = useSelector((state) => state.progressbar);

    const dispatch = useDispatch();

    return {
        currentProgress: progress,
        incProgress20: () => dispatch(increaseProgressBy20()),
        incProgress: (value) => dispatch(increaseProgressByCustom(value)),
        completeProgress: () => dispatch(completeProgress()),
        resetProgress: () => dispatch(resetProgress()),
    }
}