import { useDispatch, useSelector } from "react-redux";
import { updateQuery, resetQuery, refreshCachedResults } from "../features/query/mbdbQuerySlice";


export function useMbdbQuery() {
    const mbdbQuery = useSelector((state) => state.mbdbquery);

    const dispatch = useDispatch();

    return {
        mbdbQuery: mbdbQuery,
        updateMbdbQuery: (query) => dispatch(updateQuery(query)),
        resetMbdbQuery: () => dispatch(resetQuery()),
        refreshMbdbCachedResults: () => dispatch(refreshCachedResults()),
    }
}