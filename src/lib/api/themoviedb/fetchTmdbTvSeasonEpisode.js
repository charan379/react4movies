import axios from "axios";
import { themoviedbAPI } from ".";

export async function fetchTmdbTvSeasonEpisode({ tmdbTitleId, seasonNumber, episodeNumber, source = { token: null } }) {
    try {
        // Make the API request to get tmdb tv season episode data 
        const res = await themoviedbAPI().get(`/tv/${tmdbTitleId}/season/${seasonNumber}/episode/${episodeNumber}`, {
            cancelToken: source?.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error fetching tmdb episode data')
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