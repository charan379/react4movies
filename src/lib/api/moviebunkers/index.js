import { AppConfig } from "@/app.config"
import axios from "axios"


export function moviebunkersAPI(auth = { token: null }) {
    return axios.create({
        timeout: 300000,
        baseURL: AppConfig.MOVIEBUNKERS_API,
        headers: {
            Authorization: `Bearer ${auth?.token}`,
        }
    })

};
