import { useDispatch, useSelector } from "react-redux"
import { updateTmdbSearch } from "../store/reduxStore/actions/TmdbSearchActions";



const useTmdbSearch = () => {

    const dispatch = useDispatch();

    const query = useSelector((state) => state.TmdbSearchReducer);

    const setQuery = (queryObject) => dispatch(updateTmdbSearch(queryObject))

    return { tmdbSearch: query, setTmdbSearch: setQuery }
}

export default useTmdbSearch;