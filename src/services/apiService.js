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

    delete(url, headers) {
        return this.api.delete(url, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                ...headers,
            }
        })
    }

    put(url, body, headers) {
        return this.api.put(url, body, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                ...headers,
            }
        })
    }

    auth(body) {
        const hash = randomHash(8)
        const token = btoa(`${hash}:4cbcea96de`)
        return this.post('auth/login', body, {
            Authorization: `Basic ${token}`
        })
    }

    postCity(body) {
        return this.post('db/city', body)
    }

    postPoint(body) {
        return this.post('db/point', body)
    }

    postCar(body) {
        return this.post('db/car', body)
    }

    postRate(body) {
        return this.post('db/rate', body)
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

    getCar(id) {
        return this.get(`db/car/${id}`)
    }

    getCities() {
        return this.get('db/city')
    }

    getCity(id) {
        return this.get(`db/city/${id}`)
    }

    deleteCity(id) {
        return this.delete(`db/city/${id}`)
    }

    deleteRate(id) {
        return this.delete(`db/rate/${id}`)
    }

    deletePoint(id) {
        return this.delete(`db/point/${id}`)
    }

    deleteCar(id) {
        return this.delete(`db/car/${id}`)
    }

    getPoints() {
        return this.get('db/point')
    }

    getPoint(id) {
        return this.get(`db/point/${id}`)
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


    getRateType() {
        return this.get('db/rateType')
    }

    getRateItem(id) {
        return this.get(`db/rate/${id}`)
    }

    changeOrder(id, body) {
        return this.put(`db/order/${id}`, body)
    }

    changeCity(id, body) {
        return this.put(`db/city/${id}`, body)
    }

    changePoint(id, body) {
        return this.put(`db/point/${id}`, body)
    }

    changeRate(id, body) {
        return this.put(`db/rate/${id}`, body)
    }

    changeCar(id, body) {
        return this.put(`db/car/${id}`, body)
    }

}
const API = new ApiService();
export default API;