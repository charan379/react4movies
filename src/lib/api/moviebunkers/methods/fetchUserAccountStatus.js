import axios from "axios";
import { moviebunkersAPI } from "..";

export async function fetchUserAccountStatus({ idType, id, source = { token: null } }) {
    try {
        // Make the API request to fetch user account status
        const res = await moviebunkersAPI().get(`/users/account-status/${idType}/${id}`, {
            cancelToken: source.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error fetching user account status from mbdb')
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
        if (message === "Request Validation Failed") {
            throw new Error("Invalid UserName / Email");
        } else {
            throw new Error(message);
        }

    }
}