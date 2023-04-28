import axios from "axios";
import { AppConfig } from "setup/app-config";
import useAuth from "hooks/useAuth";

const useMoviebunkersAPI = () => {
    const { auth } = useAuth();

    const movieBunkersAPI = axios.create({
        timeout: 60000,
        baseURL: AppConfig.MOVIEBUNKERS_API,
        headers: {
            Authorization: `Bearer ${auth?.token}`,
        },
    });

    return { movieBunkersAPI };
};

export default useMoviebunkersAPI;
