import axios from "axios";
import { moviebunkersAPI } from "..";

export async function verifyUser({ userName, otp, source = { token: null } }) {
    try {
        // Make the API request verify user
        const res = await moviebunkersAPI().put(`/users/verify-user`, {
            userName, otp
        }, {
            cancelToken: source.token
        })
        if (res?.data) {
            return res.data;
        } else {
            throw new Error("Can't complete your verification at this time.")
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