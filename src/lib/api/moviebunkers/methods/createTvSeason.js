import axios from "axios";
import { moviebunkersAPI } from "..";

export async function createTvSeason({ season, auth, source = { token: null } }) {
    try {
        // Make the API request to post new tv season
        const res = await moviebunkersAPI(auth).post(`/seasons/new`, { ...season }, {
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error posting new tv season')
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