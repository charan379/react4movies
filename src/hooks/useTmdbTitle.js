import { useDispatch, useSelector } from "react-redux"
import { removeTmdbTitle, updateTmdbTitle } from "../store/actions/TmdbTitleActions";




const useTmdbTitle = () => {

    const dispatch = useDispatch();

    const title = useSelector((state) => state.TmdbTitleReducer);

    const setTitle = (titleObj) => dispatch(updateTmdbTitle(titleObj))

    const removeTitle = () => dispatch(removeTmdbTitle())

    return { tmdbTitle: title, setTmdbTitle: setTitle, removeTmdbTitle: removeTitle }
}

export default useTmdbTitle;