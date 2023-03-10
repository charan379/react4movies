import axios, { AxiosError } from "axios";
import { Config } from "../utils/Config";
import MovieBunkersException from "../utils/MovieBunkersException";


const API = Config.TMDB_API;


export async function searchTmdb(query, source = axios.CancelToken.source()) {
    try {
        const response = await axios.get(`${API}/search`,
            { params: { ...query } },
            { CancelToken: source.token });
        return response?.data;
    } catch (error) {
        const errorResponse = error?.response?.data;
        if (errorResponse) {
            throw new MovieBunkersException(errorResponse);
        } else {
            throw new AxiosError(error);
        }

    }
}