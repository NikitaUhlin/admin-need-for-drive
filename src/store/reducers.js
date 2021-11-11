export const initialState = {
    loading: true,
    error: null,
    accessToken: '',
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTHORIZATION_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
                accessToken: action.payload.access_token
            };
        case "AUTHORIZATION_STARTED":
            return {
                ...state,
                loading: true
            };
        case "AUTHORIZATION_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default reducer