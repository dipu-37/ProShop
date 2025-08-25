import axios from "axios";

const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // env থেকে নেবে
});

export default baseUrl;
