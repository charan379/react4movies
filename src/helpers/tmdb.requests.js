import axios from "axios";
import { Config } from "../utils/Config";
import MovieBunkersException from "../utils/MovieBunkersException";


const API = Config.TMDB_API;


export async function searchTmdb({ query, cancelToken }) {
    try {
        const response = await axios.get(`${API}/search`, { params: { ...query }, cancelToken: cancelToken ?? null });
        return response?.data;
    } catch (error) {
        const errorResponse = error?.response?.data;

        if (axios.isCancel(error)) {
            console.log(error);
        } else if (errorResponse) {
            throw new MovieBunkersException(errorResponse);
        } else {
            throw error;
        }

    }
}

export async function fetchTmdbTitle({ id, titleType, cancelToken }) {
    try {
        const response = await axios.get(`${API}/${titleType}/${id}`, { cancelToken: cancelToken ?? null });
        return response?.data;
    } catch (error) {
        const errorResponse = error?.response?.data;

        if (axios.isCancel(error)) {
            console.log(error);
        } else if (errorResponse) {
            throw new MovieBunkersException(errorResponse);
        } else {
            throw error;
        }

    }
}

export async function fetchTmdbTvSeason({ tmdbShowId, seasonNumber, cancelToken }) {
    try {
        const response = await axios.get(`${API}/tv/${tmdbShowId}/season/${seasonNumber}`, { cancelToken: cancelToken ?? null});
        return response?.data;
    } catch (error) {
        const errorResponse = error?.response?.data;

        if (axios.isCancel(error)) {
            console.log(error);
        } else if (errorResponse) {
            throw new MovieBunkersException(errorResponse);
        } else {
            throw error;
        }


    }
}