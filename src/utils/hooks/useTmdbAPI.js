import axios from "axios";
import { Config } from "../Config";

const useTmdbAPI = () => {

    const tmdbAPI = axios.create({
        timeout: 60000,
        baseURL: Config.TMDB_API,
    });

    return { tmdbAPI };
};

export default useTmdbAPI;
