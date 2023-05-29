
export async function fetchTmdbTitle({ titleType = 'movie', id, source = { token: null } }) {
    try {
        // Make the API request to get requested title
        const res = await themoviedbAPI().get(`/${titleType}/${id}`, {
            cancelToken: source?.token
        })

        if (res?.data) {
            return res.data;
        } else {
            throw new Error('Error fetching tmdb title')
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