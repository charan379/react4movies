import axios from "axios";
import { Config } from "../Config";

const useTmdbAPI = () => {

    const tmdbAPI = axios.create({
        timeout: 120000,
        baseURL: Config.TMDB_API,
    });

    return { tmdbAPI };
};

export default useTmdbAPI;
