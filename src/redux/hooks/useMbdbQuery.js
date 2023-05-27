import { useDispatch, useSelector } from "react-redux";
import { updateQuery, resetQuery } from "../features/query/mbdbQuerySlice";


export function useMbdbQuery() {
    const mbdbQuery = useSelector((state) => state.mbdbquery);

    console.log('mbdb quwersd : ', mbdbQuery)
    const dispatch = useDispatch();

    return {
        mbdbQuery: mbdbQuery,
        updateMbdbQuery: (query) => dispatch(updateQuery(query)),
        resetMbdbQuery: () => dispatch(resetQuery()),
    }
}