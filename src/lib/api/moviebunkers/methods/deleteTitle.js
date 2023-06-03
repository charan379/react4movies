import axios from "axios";
import { moviebunkersAPI } from "..";

export async function deleteTitle({ mbdbTitleId, auth, source = { token: null } }) {
    try {
        // Make the API request to title delete title
        const res = await moviebunkersAPI(auth).delete(`/titles/delete/id/${mbdbTitleId}`, {
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error deleting title')
        }

    } catch (error) {
        console.log(error)
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