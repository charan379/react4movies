import axios from "axios";
import { moviebunkersAPI } from "..";

export async function fetchAvailableLanguages({ source }) {
    try {
        // Make the API request to get available genres
        const res = await moviebunkersAPI().get(`/titles/available-languages`, {
            cancelToken: source?.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error fetching languages')
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