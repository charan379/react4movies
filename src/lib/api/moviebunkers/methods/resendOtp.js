import axios from "axios";
import { moviebunkersAPI } from "..";

export async function resendOtp({ otpPurpose = 'verification', userName, source = { token: null } }) {
    try {
        let res;
        switch (otpPurpose) {
            case "verification":
                // Make the API request resend verification email
                res = await moviebunkersAPI().post(`/users/resend-verification-mail/${userName}`, {
                    cancelToken: source.token
                })
                break;
            case "password":
                // Make the API request send password reset email
                res = await moviebunkersAPI().post(`/users/send-password-reset-mail/${userName}`, {
                    cancelToken: source.token
                })
                break;

            default:
                break;
        }

        if (res?.data) {
            return res.data;
        } else {
            throw new Error("Can't send OTP at this time.")
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