import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import * as selectors from "../../store/selectors"

const PrivateRoute = ({ children }) => {
    const auth = useSelector(selectors.auth)
    const error = useSelector(selectors.error)

    let content = children

    if (!auth || error === 401) {
        content = <Navigate
            to="/auth"
        />
    } else if (error) {
        content = <Navigate
            to="/error"
        />
    }

    return content
}
export default PrivateRoute