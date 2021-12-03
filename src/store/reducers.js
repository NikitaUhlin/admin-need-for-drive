import API from "../services/apiService";
import { setCookie, getCookie } from "../utils/cookie";

const token = getCookie('token')

export const initialState = {
    loading: false,
    error: null,
    auth: !!token,
    countOrder: 0,
    page: 1,
    orders: [],
    loadingData: true,
    cars: [],
    cities: [],
    statuses: [],
    category: [],
    rate: [],
    points: [],
    filterOrders: {},
    loadingOrder: false,
    changeOrderSuccess: false,
    changeOrderFailure: false,
    order: {},
    loadingOrderItem: true,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTHORIZATION_SUCCESS":
            setCookie('token', action.payload.access_token)
            setCookie('refreshToken', action.payload.refresh_token)
            API.setToken(action.payload.access_token)

            return {
                ...state,
                loading: false,
                error: null,
                auth: true
            };
        case "AUTHORIZATION_STARTED":
            return {
                ...state,
                loading: true,
                auth: false
            };
        case "AUTHORIZATION_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                auth: false
            };
        case "GET_ORDERS_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
                countOrder: action.payload.count,
                orders: action.payload.data,
            };
        case "GET_ORDERS_STARTED":
            return {
                ...state,
                loading: true
            };
        case "GET_ORDERS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                auth: false
            };
        case "GET_RATE_SUCCESS":
            return {
                ...state,
                loadingData: false,
                error: null,
                rate: action.payload,
            };
        case "GET_CATEGORY_SUCCESS":
            return {
                ...state,
                loadingData: false,
                error: null,
                category: action.payload,
            };

        case "GET_POINTS_SUCCESS":
            return {
                ...state,
                loadingData: false,
                error: null,
                points: action.payload,
            };

        case "GET_CARS_SUCCESS":
            return {
                ...state,
                loadingData: false,
                error: null,
                cars: action.payload,
            };
        case "GET_CITIES_SUCCESS":
            return {
                ...state,
                loadingData: false,
                error: null,
                cities: action.payload,
            };
        case "GET_STATUSES_SUCCESS":
            return {
                ...state,
                loadingData: false,
                error: null,
                statuses: action.payload,
            };
        case "GET_DATA_STARTED":
            return {
                ...state,
                loadingData: true
            };
        case "GET_DATA_FAILURE":
            return {
                ...state,
                loadingData: false,
                error: action.payload,
            };
        case "CHANGE_ORDER_SUCCESS":
            const orderIndex = state.orders.findIndex((item) => action.payload.id === item.id)
            const newOrders = [...state.orders]
            newOrders.splice(orderIndex, 1, action.payload)
            return {
                ...state,
                loadingOrder: false,
                error: null,
                orders: newOrders,
                changeOrderSuccess: true,
                changeOrderFailure: false
            };
        case "CHANGE_ORDER_STARTED":
            return {
                ...state,
                loadingOrder: true,
                changeOrderSuccess: false,
                changeOrderFailure: false
            };
        case "MESSAGE_TRIGGER":
            return {
                ...state,
                changeOrderSuccess: false,
            };
        case "CHANGE_ORDER_FAILURE":
            return {
                ...state,
                loadingOrder: false,
                error: action.payload,
                changeOrderSuccess: false,
                changeOrderFailure: true
            };
        case "GET_ORDER_SUCCESS":
            return {
                ...state,
                loadingOrderItem: false,
                error: null,
                order: action.payload.data,
            };
        case "GET_ORDER_STARTED":
            return {
                ...state,
                loadingOrderItem: true
            };
        case "GET_ORDER_FAILURE":
            return {
                ...state,
                loadingOrderItem: false,
                error: action.payload,
                auth: false
            };

        default:
            return state;
    }
}

export default reducer