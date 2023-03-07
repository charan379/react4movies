import axios from "axios";
import { Config } from "../utils/Config";

const API = Config.SERVER;

export async function fetchWhoAmI(source = axios.CancelToken.source()) {
  try {
    const response = await axios.get(`${API}/auth/who-am-i`, {
      withCredentials: true,
      cancelToken: source.token
    });
    return response?.data;
  } catch (error) {
    const errorResponse = error?.response?.data?.error;
    if (errorResponse) {
      console.log(JSON.stringify(errorResponse));
    } else {
      console.log(error);
    }
  }
}
