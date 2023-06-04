import { AppConfig } from "@/app.config"
import axios from "axios"


export function themoviedbAPI() {
    return axios.create({
        timeout: 25000,
        baseURL: AppConfig.TMDB_API,
    })

};