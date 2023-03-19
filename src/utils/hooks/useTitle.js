import { useDispatch, useSelector } from "react-redux"
import { removeTitle, updateTitle } from "../store/reduxStore/actions/TitleActions";



const useTitle = () => {

    const dispatch = useDispatch();

    const titleData = useSelector((state) => state.TitleReducer);

    const setTitleData = (titleObj) => dispatch(updateTitle(titleObj))

    const flushTitleData = () => dispatch(removeTitle())

    return { title: titleData, setTitle: setTitleData, flushTitle: flushTitleData }
}

export default useTitle;