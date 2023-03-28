import axios from "axios";
import { Config } from "../Config";
import useAuth from "./useAuth";

const useMovieBunkersAPI = () => {
    const { auth } = useAuth();

    const movieBunkersAPI = axios.create({
        timeout: 10000,
        baseURL: Config.MOVIEBUNKERS_API,
        headers: {
            Authorization: `Bearer ${auth?.token}`,
        },
    });

    return { movieBunkersAPI };
};

export default useMovieBunkersAPI;
