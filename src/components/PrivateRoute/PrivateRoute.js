import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import * as selectors from "../../store/selectors"

const PrivateRoute = ({ children }) => {
    const auth = useSelector(selectors.auth)

    return auth ?
        children :
        <Navigate
            to="/auth"
        />
}
export default PrivateRoute