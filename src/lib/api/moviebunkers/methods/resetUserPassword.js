import axios from "axios";
import { moviebunkersAPI } from "..";

export async function resetUserPassword({ userName, newPassword, otp, source = { token: null } }) {
    try {
        // Make the API request to reset user password
        const res = await moviebunkersAPI().put(`/users/reset-password`, {
            userName, newPassword, otp
        }, {
            cancelToken: source.token
        })
        if (res?.data) {
            return res.data;
        } else {
            throw new Error("Can't reset your password at this time.")
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