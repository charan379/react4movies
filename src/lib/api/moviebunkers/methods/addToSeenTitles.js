import axios from "axios";
import { moviebunkersAPI } from "..";

export async function addToSeenTitles({ mbdbTitleId, source = { token: null } }) {
    try {
        // Make the API request to add title user seen list
        const res = await moviebunkersAPI().post(`/userdata/add-to-seen/${mbdbTitleId}`, {
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error adding to seen list')
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