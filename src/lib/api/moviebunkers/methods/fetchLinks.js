import axios from "axios";
import { moviebunkersAPI } from "..";

export async function fetchLinks({ parentId, limit, sortBy, auth, source = { token: null } }) {
    try {
        // Make the API request to fetch link
        const res = await moviebunkersAPI(auth).get(`links/parent/${parentId}`, {
            params: { limit, sort_by: sortBy },
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error fetching links')
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