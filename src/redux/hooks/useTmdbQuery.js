import { useDispatch, useSelector } from "react-redux";
import { updateQuery, resetQuery } from "../features/query/tmdbQuerySlice";


export function useTmdbQuery() {
    const tmdbQuery = useSelector((state) => state.tmdbquery);

    const dispatch = useDispatch();

    return {
        tmdbQuery: tmdbQuery,
        updateTmdbQuery: (query) => dispatch(updateQuery(query)),
        resetTmdbQuery: () => dispatch(resetQuery()),
    }
}