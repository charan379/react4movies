import axios from "axios";
import { moviebunkersAPI } from "..";

export async function fetchWhoAmi({ source = { token: null } }) {
    try {
        // Make the API request to get available genres
        const res = await moviebunkersAPI().get(`/auth/who-am-i`, {
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error fetching who-am-i')
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