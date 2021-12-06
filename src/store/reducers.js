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
    rateType: [],
    points: [],
    filterOrders: {},
    loadingOrder: false,
    changeOrderSuccess: false,
    changeOrderFailure: false,
    loadingCity: false,
    changeCitySuccess: false,
    changeCityFailure: false,
    loadingPoint: false,
    changePointSuccess: false,
    changePointFailure: false,
    changeCarSuccess: false,
    changeCarFailure: false,
    loadingCar: false,
    order: {},
    city: {},
    point: {},
    rateItem: {},
    car: {},
    loadingOrderItem: true,
    loadingCityItem: true,
    loadingPointItem: true,
    loadingRateItem: true,
    loadingCarItem: true,
    loadingRateType: false,
    loadingPostCity: false,
    loadingPostPoint: false,
    loadingPostRate: false,
    loadingPostCar: false,
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

        case "CHANGE_ORDER_FAILURE":
            return {
                ...state,
                loadingOrder: false,
                error: action.payload,
                changeOrderSuccess: false,
                changeOrderFailure: true
            };
        case "MESSAGE_TRIGGER":
            return {
                ...state,
                changeOrderSuccess: false,
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
            };
        case "GET_CITY_SUCCESS":
            return {
                ...state,
                loadingCityItem: false,
                error: null,
                city: action.payload.data,
            };
        case "GET_CITY_STARTED":
            return {
                ...state,
                loadingCityItem: true
            };
        case "GET_CITY_FAILURE":
            return {
                ...state,
                loadingCityItem: false,
                error: action.payload,
            };
        case "GET_CAR_SUCCESS":
            return {
                ...state,
                loadingCarItem: false,
                error: null,
                car: action.payload.data,
            };
        case "GET_CAR_STARTED":
            return {
                ...state,
                loadingCarItem: true
            };
        case "GET_CAR_FAILURE":
            return {
                ...state,
                loadingCarItem: false,
                error: action.payload,
            };
        case "CHANGE_CITY_SUCCESS":
            return {
                ...state,
                loadingCity: false,
                error: null,
                changeCitySuccess: true,
                changeCityFailure: false
            };
        case "CHANGE_CITY_STARTED":
            return {
                ...state,
                loadingCity: true,
                changeCitySuccess: false,
                changeCityFailure: false
            };
        case "CHANGE_CITY_FAILURE":
            return {
                ...state,
                loadingCity: false,
                error: action.payload,
                changeCitySuccess: false,
                changeCityFailure: true
            };
        case "CHANGE_CAR_SUCCESS":
            return {
                ...state,
                loadingCar: false,
                error: null,
                changeCarSuccess: true,
                changeCarFailure: false
            };
        case "CHANGE_CAR_STARTED":
            return {
                ...state,
                loadingCar: true,
                changeCarSuccess: false,
                changeCarFailure: false
            };
        case "CHANGE_CAR_FAILURE":
            return {
                ...state,
                loadingCar: false,
                error: action.payload,
                changeCarSuccess: false,
                changeCarFailure: true
            };
        case "CHANGE_POINT_SUCCESS":
            return {
                ...state,
                loadingPoint: false,
                error: null,
                changePointSuccess: true,
                changePointFailure: false
            };
        case "CHANGE_POINT_STARTED":
            return {
                ...state,
                loadingPoint: true,
                changePointSuccess: false,
                changePointFailure: false
            };
        case "CHANGE_POINT_FAILURE":
            return {
                ...state,
                loadingPoint: false,
                error: action.payload,
                changePointSuccess: false,
                changePointFailure: true
            };
        case "GET_POINT_SUCCESS":
            return {
                ...state,
                loadingPointItem: false,
                error: null,
                point: action.payload.data,
            };
        case "GET_POINT_STARTED":
            return {
                ...state,
                loadingPointItem: true
            };
        case "GET_POINT_FAILURE":
            return {
                ...state,
                loadingPointItem: false,
                error: action.payload,
            };

        case "GET_RATE_TYPE_SUCCESS":
            return {
                ...state,
                loadingRateType: false,
                error: null,
                rateType: action.payload.data,
            };
        case "GET_RATE_TYPE_STARTED":
            return {
                ...state,
                loadingRateType: true
            };
        case "GET_RATE_TYPE_FAILURE":
            return {
                ...state,
                loadingRateType: false,
                error: action.payload,
            };
        case "GET_RATE_ITEM_SUCCESS":
            return {
                ...state,
                loadingRateItem: false,
                error: null,
                rateItem: action.payload.data,
            };
        case "GET_RATE_ITEM_STARTED":
            return {
                ...state,
                loadingRateItem: true
            };
        case "GET_RATE_ITEM_FAILURE":
            return {
                ...state,
                loadingRateItem: false,
                error: action.payload,
            };
        case "CLEAR_RATE_ITEM":
            return {
                ...state,
                rateItem: {},
            };
        case "POST_CITY_SUCCESS":
            let newCities = [...state.cities]
            newCities.push(action.payload.data)
            return {
                ...state,
                cities: newCities,
                loadingPostCity: false,
                error: null,
            };
        case "POST_CITY_STARTED":
            return {
                ...state,
                loadingPostCity: true
            };
        case "POST_CITY_FAILURE":
            return {
                ...state,
                loadingPostCity: false,
                error: action.payload,
            };
        case "POST_POINT_SUCCESS":
            let newPoint = [...state.points]
            newPoint.push(action.payload.data)
            return {
                ...state,
                points: newPoint,
                loadingPostPoint: false,
                error: null,
            };
        case "POST_POINT_STARTED":
            return {
                ...state,
                loadingPostPoint: true
            };
        case "POST_POINT_FAILURE":
            return {
                ...state,
                loadingPostPoint: false,
                error: action.payload,
            };
        case "POST_RATE_SUCCESS":
            let newRate = [...state.rate]
            newRate.push(action.payload.data)
            return {
                ...state,
                rate: newRate,
                loadingPostRate: false,
                error: null,
            };
        case "POST_RATE_STARTED":
            return {
                ...state,
                loadingPostRate: true
            };
        case "POST_RATE_FAILURE":
            return {
                ...state,
                loadingPostRate: false,
                error: action.payload,
            };
        case "POST_CAR_SUCCESS":
            let newCar = [...state.cars]
            newCar.push(action.payload.data)
            return {
                ...state,
                cars: newCar,
                loadingPostCar: false,
                error: null,
            };
        case "POST_CAR_STARTED":
            return {
                ...state,
                loadingPostCar: true
            };
        case "POST_CAR_FAILURE":
            return {
                ...state,
                loadingPostCar: false,
                error: action.payload,
            };
        case "DELETE_CITY_SUCCESS":
            const cityIndex = state.cities.findIndex((item) => action.payload === item.id)
            let cityList = [...state.cities]
            cityList.splice(cityIndex, 1)
            return {
                ...state,
                error: null,
                cities: cityList,
            };
        case "DELETE_CITY_STARTED":
            return {
                ...state,
            };

        case "DELETE_CITY_FAILURE":
            return {
                ...state,
                error: action.payload,
            };
        case "DELETE_RATE_SUCCESS":
            const rateIndex = state.rate.findIndex((item) => action.payload === item.id)
            let rateList = [...state.rate]
            rateList.splice(rateIndex, 1)
            return {
                ...state,
                error: null,
                rate: rateList,
            };
        case "DELETE_RATE_STARTED":
            return {
                ...state,
            };

        case "DELETE_RATE_FAILURE":
            return {
                ...state,
                error: action.payload,
            };
        case "DELETE_CAR_SUCCESS":
            const carIndex = state.cars.findIndex((item) => action.payload === item.id)
            let carList = [...state.cars]
            carList.splice(carIndex, 1)
            return {
                ...state,
                error: null,
                cars: carList,
            };
        case "DELETE_CAR_STARTED":
            return {
                ...state,
            };

        case "DELETE_CAR_FAILURE":
            return {
                ...state,
                error: action.payload,
            };

        case "DELETE_POINT_SUCCESS":
            const pointIndex = state.points.findIndex((item) => action.payload === item.id)
            let pointList = [...state.points]
            pointList.splice(pointIndex, 1)
            return {
                ...state,
                error: null,
                points: pointList,
            };
        case "DELETE_POINT_STARTED":
            return {
                ...state,
            };

        case "DELETE_POINT_FAILURE":
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
}

export default reducer