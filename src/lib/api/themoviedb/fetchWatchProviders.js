import axios from "axios";
import { themoviedbAPI } from ".";


export async function fetchWatchProviders({ titleType, tmdbId, country = 'IN', source }) {
    try {
        // Make the API request to get requested title
        // Use axios to make a GET request to the TMDB API to fetch watch providers for a given movie or TV show
        const res = await themoviedbAPI().get(`/providers/${titleType}/${tmdbId}/${country ?? 'IN'}`, {
            cancelToken: source?.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error fetching watch providers')
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