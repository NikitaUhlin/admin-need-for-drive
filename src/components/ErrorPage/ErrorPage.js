import React from "react";
import { Button, Result } from "antd";
import { useSelector } from "react-redux";

import { error } from "../../store/selectors";
import Layout from "../Layout/Layout"
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const errorCode = useSelector(error)
    const navigate = useNavigate()
    return (
        <Layout>
            <Result
                status="500"
                title={errorCode}
                subTitle="Что-то пошло не так"
                extra={<Button type="primary" onClick={() => navigate(-1)}>Назад</Button>}
            />
        </Layout>
    )
}
export default ErrorPage