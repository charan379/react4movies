import axios from "axios";
import { Config } from "../utils/Config";
import MovieBunkersException from "../utils/MovieBunkersException";


const API = Config.MOVIEBUNKERS_API;


export async function search({ query, cancelToken }) {
    try {
        const response = await axios.get(`${API}/titles`, { params: { ...query }, cancelToken: (cancelToken ?? null), withCredentials: true });
        return response?.data;
    } catch (error) {
        const errorResponse = error?.response?.data;

        if (axios.isCancel(error)) {
            console.log("Request Cancelled");
        } else if (errorResponse?.error?.message) {
            throw new MovieBunkersException(errorResponse);
        } else {
            throw error;
        }
    }
}

export async function fetchTitle({ id, cancelToken }) {

    try {
        const response = await axios.get(`${API}/titles/id/${id}`, { cancelToken: (cancelToken ?? null), withCredentials: true });
        return response?.data;
    } catch (error) {
        const errorResponse = error?.response?.data;
        if (axios.isCancel(error)) {
            console.log("Request Cancelled");
        } else if (errorResponse?.error?.message) {
            throw new MovieBunkersException(errorResponse);
        } else {
            throw error;
        }
    }
}

export async function newTitle({ title, cancelToken }) {
    try {
        const response = await axios.post(`${API}/titles/new`, title, { cancelToken: cancelToken ?? null, withCredentials: true });
        return response?.data;
    } catch (error) {
        const errorResponse = error?.response?.data;
        if (axios.isCancel(error)) {
            console.log("Request Cancelled");
        } else if (errorResponse?.error?.message) {
            throw new MovieBunkersException(errorResponse);
        } else {
            throw error;
        }
    }
}