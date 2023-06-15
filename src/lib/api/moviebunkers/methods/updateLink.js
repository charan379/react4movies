import axios from "axios";
import { moviebunkersAPI } from "..";

export async function updateLink({ linkId, update, auth, source = { token: null } }) {
    try {
        // Make the API request to update link
        const res = await moviebunkersAPI(auth).put(`links/update/${linkId}`, { ...update }, {
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error updating link')
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