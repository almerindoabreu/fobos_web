import axios from "axios";
import { urlApi } from "./url.js";

const api = axios.create({
  baseURL: urlApi,
})

export default api;
