import axios from "axios";
import { AppConfig } from "setup/app-config";

const useTmdbAPI = () => {

    const tmdbAPI = axios.create({
        timeout: 60000,
        baseURL: AppConfig.TMDB_API,
    });

    return { tmdbAPI };
};

export default useTmdbAPI;
