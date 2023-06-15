import axios from "axios";
import { moviebunkersAPI } from "..";

export async function fetchTvSeasons({ titleId, auth, queryParams = { limit: 0, sort_by: 'air_date.desc', skip: 0 }, source = { token: null } }) {
    try {
        // Make the API request to fetch tv sesasons
        const res = await moviebunkersAPI(auth).get(`/seasons/tv/${titleId}`, {
            params: queryParams,
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error fetching tv seasons from mbdb')
        }

    } catch (error) {
        // Get error message from response, or use a generic message.
        let message = '';

        // Handle errors by returning the appropriate message
        if (axios.isCancel(error)) {
            message = 'cancelled'
        } else {
            message = error?.response?.data?.error?.message ??
                error?.message ??
                "Something went wrong";
        }

        throw new Error(message);
    }
}