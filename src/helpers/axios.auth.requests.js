import axios, { AxiosError } from "axios";
import { Config } from "../utils/Config";
import MovieBunkersException from "../utils/MovieBunkersException";

const API = Config.SERVER;

export async function fetchWhoAmI(source = axios.CancelToken.source()) {
  try {
    const response = await axios.get(`${API}/auth/who-am-i`, {
      withCredentials: true,
      cancelToken: source.token,
    });
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

export async function authenticateUser(
  userName,
  password,
  source = axios.CancelToken.source()
) {
  try {
    const response = await axios.post(
      `${API}/auth/cookie-auth`,
      {
        userName,
        password,
      },
      {
        withCredentials: true,
        cancelToken: source.token,
      }
    );

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

export async function logout(source = axios.CancelToken.source()) {
  try {
    const response = await axios.get(`${API}/auth/logout`, {
      withCredentials: true,
      cancelToken: source.token,
    });
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