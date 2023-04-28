import { useDispatch, useSelector } from "react-redux";
import {
  resetTmdbSearch,
  updateTmdbSearch,
} from "../store/actions/TmdbSearchActions";

const useTmdbSearch = () => {
  const dispatch = useDispatch();

  const query = useSelector((state) => state.TmdbSearchReducer);

  const setQuery = (queryObject) => dispatch(updateTmdbSearch(queryObject));

  const resetQuery = () => dispatch(resetTmdbSearch());

  return {
    tmdbSearch: query,
    setTmdbSearch: setQuery,
    restTmdbSearch: resetQuery,
  };
};

export default useTmdbSearch;
