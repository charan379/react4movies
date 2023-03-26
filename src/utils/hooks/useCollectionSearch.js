import { useDispatch, useSelector } from "react-redux";
import {
  resetCollectionSearch,
  updateCollectionSearch,
} from "../store/reduxStore/actions/CollectionSearchActions";

const useCollectionSearch = () => {
  const dispatch = useDispatch();

  const query = useSelector((state) => state.CollectionSearchReducer);

  const setQuery = (queryObject) =>
    dispatch(updateCollectionSearch(queryObject));

  const resetQuery = () => dispatch(resetCollectionSearch());

  return {
    collectionQuery: query,
    setCollectionQuery: setQuery,
    resetCollectionSearch: resetQuery,
  };
};

export default useCollectionSearch;
