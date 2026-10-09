import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_API_URL;
const apiKey = import.meta.env.VITE_BASE_API_KEY;

const youtubeApi = axios.create({ baseURL: apiUrl, params: { key: apiKey } });

export default youtubeApi;
