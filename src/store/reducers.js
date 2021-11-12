import { setCookie } from "../utils/cookie";

export const initialState = {
    loading: false,
    error: null,
    auth: false,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTHORIZATION_SUCCESS":
            setCookie('token', action.payload.access_token)
            setCookie('refreshToken', action.payload.refresh_token)
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
        default:
            return state;
    }
}

export default reducer