import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import { getData } from "../../store/actions";
import Login from "../Login/Login";
import OrderList from "../OrderList/OrderList";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import OrderPage from "../OrderPage/OrderPage";
import CarsList from "../CarsList/CarsList";
import Layout from "../Layout/Layout"
import PointList from "../PointList/PointList";
import RateList from "../RateList/RateList";
import CityList from "../CityList/CityList";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData())
  }, [])

  return (
    <Router>
      <Routes>
        {["/", "/orders"].map((path, index) =>
          <Route
            exact
            key={index}
            path={path}
            element={<PrivateRoute><OrderList /></PrivateRoute>}
          />
        )}

        <Route
          path="/order/:id"
          element={<PrivateRoute><OrderPage /></PrivateRoute>}
        />
        <Route
          path="/cars"
          element={<PrivateRoute><CarsList /></PrivateRoute>}
        />
        <Route
          path="/car/:id"
          element={<PrivateRoute><Layout /></PrivateRoute>}
        />
        <Route
          path="/points"
          element={<PrivateRoute><PointList /></PrivateRoute>}
        />
        <Route
          path="/point/:id"
          element={<PrivateRoute><Layout /></PrivateRoute>}
        />
        <Route
          path="/rates"
          element={<PrivateRoute><RateList /></PrivateRoute>}
        />
        <Route
          path="/rate/:id"
          element={<PrivateRoute><Layout /></PrivateRoute>}
        />
        <Route
          path="/cities"
          element={<PrivateRoute><CityList /></PrivateRoute>}
        />
        <Route
          path="/city/:id"
          element={<PrivateRoute><Layout /></PrivateRoute>}
        />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
