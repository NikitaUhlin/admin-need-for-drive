import API from "../services/apiService";

const getAuthToken = (body) => {
    return dispatch => {
        dispatch(getAuthTokenStarted());

        API.auth(body)
            .then(res => {
                dispatch(getAuthTokenSuccess(res.data));
            })
            .catch(err => {
                if (err.response.status === 401)
                    dispatch(getAuthTokenFailure(err.response.data));
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
                dispatch(getOrdersFailure(err.response));
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
        Promise.all([API.getCars(), API.getCities(), API.getStatuses()])
            .then(res => {
                dispatch(getCarsSuccess(res[0].data.data))
                dispatch(getCitiesSuccess(res[1].data.data))
                dispatch(getStatusesSuccess(res[2].data.data))
            })
            .catch(err => {
                dispatch(getDataFailure(err));
            });
    };

}

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
                dispatch(changeOrderSuccess(res.data));
            })
            .catch(err => {
                dispatch(changeOrderFailure(err.response));
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

const changeOrderFailure = error => ({
    type: "CHANGE_ORDER_FAILURE",
    payload: error
});


export {
    getAuthToken,
    getOrders,
    getData,
    changeOrder
}