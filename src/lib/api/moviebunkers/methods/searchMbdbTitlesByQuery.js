import axios from "axios";
import { moviebunkersAPI } from "..";

export async function searchMbdbTitlesByQuery({ params = {}, auth, source = { token: null } }) {
    try {
        // Make the API request to get search results
        const res = await moviebunkersAPI(auth).get(`/titles`, {
            params: params,
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error fetching mbdb titles search')
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