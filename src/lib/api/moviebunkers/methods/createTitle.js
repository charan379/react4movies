import axios from "axios";
import { moviebunkersAPI } from "..";

export async function createTitle({ title, auth, source = { token: null } }) {
    try {
        // Make the API request to post new title
        const res = await moviebunkersAPI(auth).post(`/titles/new`, { ...title }, {
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error posting new title')
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