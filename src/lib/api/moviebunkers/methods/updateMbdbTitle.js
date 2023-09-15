import axios from "axios";
import { moviebunkersAPI } from "..";

export async function updateMbdbTitle({ titleId, update, auth, source = { token: null } }) {
    try {
        // Make the API request to update title
        const res = await moviebunkersAPI(auth).put(`/titles/update/id/${titleId}`, { ...update }, {
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error updating mbdb title')
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