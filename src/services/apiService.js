import axios from "axios";
import { randomHash } from "../utils/randomHash";

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: "https://api-factory.simbirsoft1.com/api/",
            headers: { "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b" },
        });
    }
    get(url) {
        return this.api.get(url)
    }

    post(url, body, headers) {
        return this.api.post(url, body, { headers })
    }

    put(url, body) {
        return this.api.put(url, body)
    }

    auth(body) {
        const hash = randomHash(8)
        const token = btoa(`${hash}:4cbcea96de`)
        return this.post('auth/login', body, {
            Authorization: `Basic ${token}`
        })
    }
}
const API = new ApiService();
export default API;