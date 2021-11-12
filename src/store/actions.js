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

export {
    getAuthToken,
}