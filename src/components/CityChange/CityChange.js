import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Spin, Form, Button, message, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons'

import * as selectors from "../../store/selectors"
import Layout from "../Layout/Layout"
import { changeCity, deleteCity, getCity, postCity } from "../../store/actions";

import styles from "./cityChange.module.less"

const CityChange = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [form] = Form.useForm()

    const city = useSelector(selectors.city)
    const loadingCityItem = useSelector(selectors.loadingCityItem)

    useEffect(() => {
        if (id !== "create") {
            if (city.id !== id)
                dispatch(getCity(id))
            else
                form.setFieldsValue({ name: city.name })
        }
    }, [city])

    const onFinish = (values) => {
        if (id !== "create")
            dispatch(changeCity(id, values))
        else
            dispatch(postCity(values))

        navigate('/cities')
    }

    const onDelete = () => {
        dispatch(deleteCity(id))
        navigate('/cities')
    }

    return (
        <Layout>
            <div className={styles.title}>
                {id === "create" ? "Создание города" : "Изменение города"}
            </div>
            <Card>
                {loadingCityItem && id !== "create" ?
                    <Spin
                        size="large"
                        indicator={
                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                    />
                    :
                    <div className={styles.content}>
                        <Form
                            layout="vertical"
                            form={form}
                            name='city'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Название:"
                                name="name"
                            >
                                <Input maxLength={15} placeholder="Введите название города" />
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
                                    Сохранить
                                </Button>

                                {id !== "create" && <Button
                                    type="primary"
                                    danger
                                    onClick={onDelete}
                                >
                                    Удалить
                                </Button>}
                            </Form.Item>
                        </Form>
                    </div>}
            </Card>
        </Layout>
    )
}

export default CityChange