import API from "../services/apiService";

const getAuthToken = (body) => {
    return dispatch => {
        dispatch(getAuthTokenStarted());

        API.auth(body)
            .then(res => {
                dispatch(getAuthTokenSuccess(res.data));
            })
            .catch(err => {
                if (err.response.status === 401) {
                    dispatch(getAuthTokenFailure(err.response.status));
                }
            });
    };
}

const getAuthTokenSuccess = newItem => ({
    type: "AUTHORIZATION_SUCCESS",
    payload: newItem
});

const getAuthTokenStarted = () => ({
    type: "AUTHORIZATION_STARTED"
});

const getAuthTokenFailure = error => ({
    type: "AUTHORIZATION_FAILURE",
    payload: error
});

const getOrders = (page, filters) => {
    return dispatch => {
        dispatch(getOrdersStarted());

        API.getOrders(page, filters)
            .then(res => {
                dispatch(getOrdersSuccess(res.data));
            })
            .catch(err => {
                dispatch(getOrdersFailure(err.response.status));
            });
    };

}

const getOrdersSuccess = newItem => ({
    type: "GET_ORDERS_SUCCESS",
    payload: newItem
});

const getOrdersStarted = () => ({
    type: "GET_ORDERS_STARTED"
});

const getOrdersFailure = error => ({
    type: "GET_ORDERS_FAILURE",
    payload: error
});

const getData = () => {
    return dispatch => {
        dispatch(getDataStarted());
        Promise.all([API.getCars(), API.getCities(), API.getStatuses(), API.getPoints(), API.getCategory(), API.getRate()])
            .then(res => {
                dispatch(getCarsSuccess(res[0].data.data))
                dispatch(getCitiesSuccess(res[1].data.data))
                dispatch(getStatusesSuccess(res[2].data.data))
                dispatch(getPointsSuccess(res[3].data.data))
                dispatch(getCategorySuccess(res[4].data.data))
                dispatch(getRateSuccess(res[5].data.data))
            })
            .catch(err => {
                dispatch(getDataFailure(err.response.status));
            });
    };

}
const getRateSuccess = newItem => ({
    type: "GET_RATE_SUCCESS",
    payload: newItem
});

const getCategorySuccess = newItem => ({
    type: "GET_CATEGORY_SUCCESS",
    payload: newItem
});

const getPointsSuccess = newItem => ({
    type: "GET_POINTS_SUCCESS",
    payload: newItem
});

const getCarsSuccess = newItem => ({
    type: "GET_CARS_SUCCESS",
    payload: newItem
});

const getCitiesSuccess = newItem => ({
    type: "GET_CITIES_SUCCESS",
    payload: newItem
});

const getStatusesSuccess = newItem => ({
    type: "GET_STATUSES_SUCCESS",
    payload: newItem
});
const getDataStarted = () => ({
    type: "GET_DATA_STARTED"
});

const getDataFailure = error => ({
    type: "GET_DATA_FAILURE",
    payload: error
});

const changeOrder = (id, body) => {
    return dispatch => {
        dispatch(changeOrderStarted());

        API.changeOrder(id, body)
            .then(res => {
                dispatch(changeOrderSuccess(res.data.data));
            })
            .catch(err => {
                dispatch(changeOrderFailure(err.response.status));
            });
    };
}

const changeOrderSuccess = newItem => ({
    type: "CHANGE_ORDER_SUCCESS",
    payload: newItem
});

const changeOrderStarted = () => ({
    type: "CHANGE_ORDER_STARTED"
});

const messageTrigger = () => ({
    type: "MESSAGE_TRIGGER"
});

const changeOrderFailure = error => ({
    type: "CHANGE_ORDER_FAILURE",
    payload: error
});

const getOrder = (id) => {
    return dispatch => {
        dispatch(getOrderStarted());

        API.getOrder(id)
            .then(res => {
                dispatch(getOrderSuccess(res.data));
            })
            .catch(err => {
                dispatch(getOrderFailure(err.response.status));
            });
    };

}

const getOrderSuccess = newItem => ({
    type: "GET_ORDER_SUCCESS",
    payload: newItem
});

const getOrderStarted = () => ({
    type: "GET_ORDER_STARTED"
});

const getOrderFailure = error => ({
    type: "GET_ORDER_FAILURE",
    payload: error
});

const getCity = (id) => {
    return dispatch => {
        dispatch(getCityStarted());

        API.getCity(id)
            .then(res => {
                dispatch(getCitySuccess(res.data));
            })
            .catch(err => {
                dispatch(getCityFailure(err.response.status));
            });
    };

}

const getCitySuccess = newItem => ({
    type: "GET_CITY_SUCCESS",
    payload: newItem
});

const getCityStarted = () => ({
    type: "GET_CITY_STARTED"
});

const getCityFailure = error => ({
    type: "GET_CITY_FAILURE",
    payload: error
});

const getPoint = (id) => {
    return dispatch => {
        dispatch(getPointStarted());

        API.getPoint(id)
            .then(res => {
                dispatch(getPointSuccess(res.data));
            })
            .catch(err => {
                dispatch(getPointFailure(err.response.status));
            });
    };

}

const getPointSuccess = newItem => ({
    type: "GET_POINT_SUCCESS",
    payload: newItem
});

const getPointStarted = () => ({
    type: "GET_POINT_STARTED"
});

const getPointFailure = error => ({
    type: "GET_POINT_FAILURE",
    payload: error
});

const getCar = (id) => {
    return dispatch => {
        dispatch(getCarStarted());

        API.getCar(id)
            .then(res => {
                dispatch(getCarSuccess(res.data));
            })
            .catch(err => {
                dispatch(getCarFailure(err.response.status));
            });
    };

}

const getCarSuccess = newItem => ({
    type: "GET_CAR_SUCCESS",
    payload: newItem
});

const getCarStarted = () => ({
    type: "GET_CAR_STARTED"
});

const getCarFailure = error => ({
    type: "GET_CAR_FAILURE",
    payload: error
});

const getRateType = () => {
    return dispatch => {
        dispatch(getRateTypeStarted());

        API.getRateType()
            .then(res => {
                dispatch(getRateTypeSuccess(res.data))
            })
            .catch(err => {
                dispatch(getRateTypeFailure(err.response.status));
            });
    };

}

const getRateTypeSuccess = newItem => ({
    type: "GET_RATE_TYPE_SUCCESS",
    payload: newItem
});

const getRateTypeStarted = () => ({
    type: "GET_RATE_TYPE_STARTED"
});

const getRateTypeFailure = error => ({
    type: "GET_RATE_TYPE_FAILURE",
    payload: error
});

const getRateItem = (id) => {
    return dispatch => {
        dispatch(getRateItemStarted());

        API.getRateItem(id)
            .then(res => {
                dispatch(getRateItemSuccess(res.data))

            })
            .catch(err => {
                dispatch(getRateItemFailure(err.response.status));
            });
    };

}

const getRateItemSuccess = newItem => ({
    type: "GET_RATE_ITEM_SUCCESS",
    payload: newItem
});

const getRateItemStarted = () => ({
    type: "GET_RATE_ITEM_STARTED"
});

const getRateItemFailure = error => ({
    type: "GET_RATE_ITEM_FAILURE",
    payload: error
});

const clearRateItem = () => ({
    type: "CLEAR_RATE_ITEM"
});
const changeCity = (id, body) => {
    return dispatch => {
        dispatch(changeCityStarted());

        API.changeCity(id, body)
            .then(res => {
                dispatch(changeCitySuccess(res.data.data));
            })
            .catch(err => {
                dispatch(changeCityFailure(err.response.status));
            });
    };
}

const changeCitySuccess = newItem => ({
    type: "CHANGE_CITY_SUCCESS",
    payload: newItem
});

const changeCityStarted = () => ({
    type: "CHANGE_CITY_STARTED"
});

const changeCityFailure = error => ({
    type: "CHANGE_CITY_FAILURE",
    payload: error
});

const changePoint = (id, body) => {
    return dispatch => {
        dispatch(changePointStarted());

        API.changePoint(id, body)
            .then(res => {
                dispatch(changePointSuccess(res.data.data));
            })
            .catch(err => {
                dispatch(changePointFailure(err.response.status));
            });
    };
}

const changePointSuccess = newItem => ({
    type: "CHANGE_POINT_SUCCESS",
    payload: newItem
});

const changePointStarted = () => ({
    type: "CHANGE_POINT_STARTED"
});

const changePointFailure = error => ({
    type: "CHANGE_POINT_FAILURE",
    payload: error
});

const changeRate = (id, body) => {
    return dispatch => {
        dispatch(changeRateStarted());

        API.changeRate(id, body)
            .then(res => {
                dispatch(changeRateSuccess(res.data.data));
            })
            .catch(err => {
                dispatch(changeRateFailure(err.response.status));
            });
    };
}

const changeRateSuccess = newItem => ({
    type: "CHANGE_RATE_SUCCESS",
    payload: newItem
});

const changeRateStarted = () => ({
    type: "CHANGE_RATE_STARTED"
});

const changeRateFailure = error => ({
    type: "CHANGE_RATE_FAILURE",
    payload: error
});

const changeCar = (id, body) => {
    return dispatch => {
        dispatch(changeCarStarted());

        API.changeCar(id, body)
            .then(res => {
                dispatch(changeCarSuccess(res.data.data));
            })
            .catch(err => {
                dispatch(changeCarFailure(err.response.status));
            });
    };
}

const changeCarSuccess = newItem => ({
    type: "CHANGE_CAR_SUCCESS",
    payload: newItem
});

const changeCarStarted = () => ({
    type: "CHANGE_CAR_STARTED"
});

const changeCarFailure = error => ({
    type: "CHANGE_CAR_FAILURE",
    payload: error
});

const postCity = (body) => {
    return dispatch => {
        dispatch(postCityStarted());

        API.postCity(body)
            .then(res => {
                dispatch(postCitySuccess(res.data));
            })
            .catch(err => {
                dispatch(postCityFailure(err.response.status));
            });
    };
}

const postCitySuccess = newItem => ({
    type: "POST_CITY_SUCCESS",
    payload: newItem
});

const postCityStarted = () => ({
    type: "POST_CITY_STARTED"
});

const postCityFailure = error => ({
    type: "POST_CITY_FAILURE",
    payload: error
});

const postPoint = (body) => {
    return dispatch => {
        dispatch(postPointStarted());

        API.postPoint(body)
            .then(res => {
                dispatch(postPointSuccess(res.data));
            })
            .catch(err => {
                dispatch(postPointFailure(err.response.status));
            });
    };
}

const postPointSuccess = newItem => ({
    type: "POST_POINT_SUCCESS",
    payload: newItem
});

const postPointStarted = () => ({
    type: "POST_POINT_STARTED"
});

const postPointFailure = error => ({
    type: "POST_POINT_FAILURE",
    payload: error
});

const postRate = (body) => {
    return dispatch => {
        dispatch(postRateStarted());

        API.postRate(body)
            .then(res => {
                dispatch(postRateSuccess(res.data));
            })
            .catch(err => {
                dispatch(postRateFailure(err.response.status));
            });
    };
}

const postRateSuccess = newItem => ({
    type: "POST_RATE_SUCCESS",
    payload: newItem
});

const postRateStarted = () => ({
    type: "POST_RATE_STARTED"
});

const postRateFailure = error => ({
    type: "POST_RATE_FAILURE",
    payload: error
});

const postCar = (body) => {
    return dispatch => {
        dispatch(postCarStarted());

        API.postCar(body)
            .then(res => {
                dispatch(postCarSuccess(res.data));
            })
            .catch(err => {
                dispatch(postCarFailure(err.response.status));
            });
    };
}

const postCarSuccess = newItem => ({
    type: "POST_CAR_SUCCESS",
    payload: newItem
});

const postCarStarted = () => ({
    type: "POST_CAR_STARTED"
});

const postCarFailure = error => ({
    type: "POST_CAR_FAILURE",
    payload: error
});

const deleteCity = (id) => {
    return dispatch => {
        dispatch(deleteCityStarted());

        API.deleteCity(id)
            .then(res => {
                dispatch(deleteCitySuccess(id));
            })
            .catch(err => {
                dispatch(deleteCityFailure(err.response.status));
            });
    };

}

const deleteCitySuccess = newItem => ({
    type: "DELETE_CITY_SUCCESS",
    payload: newItem
});

const deleteCityStarted = () => ({
    type: "DELETE_CITY_STARTED"
});

const deleteCityFailure = error => ({
    type: "DELETE_CITY_FAILURE",
    payload: error
});

const deleteRate = (id) => {
    return dispatch => {
        dispatch(deleteRateStarted());

        API.deleteRate(id)
            .then(res => {
                dispatch(deleteRateSuccess(id));
            })
            .catch(err => {
                dispatch(deleteRateFailure(err.response.status));
            });
    };

}

const deleteRateSuccess = newItem => ({
    type: "DELETE_RATE_SUCCESS",
    payload: newItem
});

const deleteRateStarted = () => ({
    type: "DELETE_RATE_STARTED"
});

const deleteRateFailure = error => ({
    type: "DELETE_RATE_FAILURE",
    payload: error
});

const deleteCar = (id) => {
    return dispatch => {
        dispatch(deleteCarStarted());

        API.deleteCar(id)
            .then(res => {
                dispatch(deleteCarSuccess(id));
            })
            .catch(err => {
                dispatch(deleteCarFailure(err.response.status));
            });
    };

}

const deleteCarSuccess = newItem => ({
    type: "DELETE_CAR_SUCCESS",
    payload: newItem
});

const deleteCarStarted = () => ({
    type: "DELETE_CAR_STARTED"
});

const deleteCarFailure = error => ({
    type: "DELETE_CAR_FAILURE",
    payload: error
});

const deletePoint = (id) => {
    return dispatch => {
        dispatch(deletePointStarted());

        API.deletePoint(id)
            .then(res => {
                dispatch(deletePointSuccess(id));
            })
            .catch(err => {
                dispatch(deletePointFailure(err.response.status));
            });
    };

}

const deletePointSuccess = newItem => ({
    type: "DELETE_POINT_SUCCESS",
    payload: newItem
});

const deletePointStarted = () => ({
    type: "DELETE_POINT_STARTED"
});

const deletePointFailure = error => ({
    type: "DELETE_POINT_FAILURE",
    payload: error
});

export {
    getAuthToken,
    getOrders,
    getData,
    changeOrder,
    getOrder,
    messageTrigger,
    getCity,
    changeCity,
    getPoint,
    changePoint,
    getRateItem,
    changeRate,
    clearRateItem,
    changeCar,
    getCar,
    getRateType,
    postCity,
    postPoint,
    postRate,
    postCar,
    deleteCity,
    deleteRate,
    deleteCar,
    deletePoint
}