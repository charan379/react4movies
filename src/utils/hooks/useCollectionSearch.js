import { useDispatch, useSelector } from "react-redux"
import { updateCollectionSearch } from "../store/reduxStore/actions/CollectionSearchActions";



const useCollectionSearch = () => {

    const dispatch = useDispatch();

    const query = useSelector((state) => state.CollectionSearchReducer);

    const setQuery = (queryObject) => dispatch(updateCollectionSearch(queryObject))

    return { collectionQuery: query, setCollectionQuery: setQuery }
}

export default useCollectionSearch;