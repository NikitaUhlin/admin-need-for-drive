import axios from "axios";
import { getCookie } from "../utils/cookie";
import { randomHash } from "../utils/randomHash";

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: "https://api-factory.simbirsoft1.com/api/",
            headers: { "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b", },
        });
        this.token = getCookie('token')
    }

    setToken(token) {
        this.token = token
    }

    get(url, headers, params) {
        return this.api.get(url, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                ...headers
            }, params
        })
    }

    post(url, body, headers) {
        return this.api.post(url, body, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                ...headers,
            }
        })
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

    getOrders(page, filters) {
        return this.get('db/order',
            {},
            {
                page: page,
                limit: 6,
                "sort[createdAt]": "-1",
                ...filters
            })
    }

    getOrder(id) {
        return this.get(`db/order/${id}`)
    }

    getCars() {
        return this.get('db/car')
    }

    getCities() {
        return this.get('db/city')
    }

    getPoints() {
        return this.get('db/point')
    }

    getStatuses() {
        return this.get('db/orderStatus')
    }

    getCategory() {
        return this.get('db/category')
    }

    getRate() {
        return this.get('db/rate')
    }

    changeOrder(id, body) {
        return this.put(`db/order/${id}`, body)
    }

}
const API = new ApiService();
export default API;