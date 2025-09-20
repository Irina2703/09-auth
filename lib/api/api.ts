import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + 'https://09-auth-eight-kappa.vercel.app/';

export const nextServer = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})