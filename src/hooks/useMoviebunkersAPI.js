import axios from "axios";
import { AppConfig } from "setup/app-config";
import { useAuth } from "hooks";

const useMoviebunkersAPI = () => {
    const { auth } = useAuth();

    const movieBunkersAPI = axios.create({
        timeout: 60000,
        baseURL: AppConfig.MOVIEBUNKERS_API,
        headers: {
            // use guest token if not logged in
            Authorization: `Bearer ${auth.token || AppConfig.GUEST_TOKEN}`,
        },
    });

    return { movieBunkersAPI };
};

export { useMoviebunkersAPI };
