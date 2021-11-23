import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { getData } from "../../store/actions";
import Login from "../Login/Login";
import OrderPage from "../OrderPage/OrderPage";
import Layout from "../Layout/Layout"
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData())
  }, [])

  return (
    <Router>
      <Routes>
        <Route
          path="/orders"
          element={<PrivateRoute><OrderPage /></PrivateRoute>}
        />
        <Route
          path="/order/:id"
          element={<PrivateRoute><Layout /></PrivateRoute>}
        />
        <Route
          path="/cars"
          element={<PrivateRoute><Layout /></PrivateRoute>}
        />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </Router>

  )
}

export default App;
