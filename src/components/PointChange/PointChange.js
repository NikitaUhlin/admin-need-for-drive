import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Spin, Form, Button, message, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons'

import * as selectors from "../../store/selectors"
import Layout from "../Layout/Layout"

import styles from "./pointChange.module.less"
import { changePoint, deletePoint, getPoint, postPoint } from "../../store/actions";


const PointChange = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [form] = Form.useForm()

    const point = useSelector(selectors.point)
    const cities = useSelector(selectors.cities)
    const loadingData = useSelector(selectors.loadingData)
    const loadingPointItem = useSelector(selectors.loadingPointItem)

    useEffect(() => {
        if (id !== 'create') {
            if (point.id !== id)
                dispatch(getPoint(id))
            else
                form.setFieldsValue({ name: point.name, cityId: point.cityId.id, address: point.address })
        }
    }, [point])

    const onFinish = (values) => {
        if (id !== 'create')
            dispatch(changePoint(id, {
                ...values,
                cityId: cities.find((item) => values.cityId === item.id)
            }))
        else
            dispatch(postPoint({
                ...values,
                cityId: cities.find((item) => values.cityId === item.id)
            }))

        navigate('/points')
    }

    const onDelete = () => {
        dispatch(deletePoint(id))
        navigate('/points')
    }

    const onChangeCity = () => form.setFieldsValue({ address: '' })

    return (
        <Layout>
            <div className={styles.title}>
                {id === "create" ? "Создание пункта выдачи" : "Изменение пункта выдачи"}
            </div>
            <Card>
                {(loadingPointItem && id !== "create") || loadingData ?
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
                            name='order'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Название:"
                                name="name"
                            >
                                <Input maxLength={30} placeholder="Введите название пункта выдачи" />
                            </Form.Item>

                            <Form.Item
                                label="Город:"
                                name="cityId"
                            >

                                <Select
                                    onChange={onChangeCity}
                                    placeholder="Выберите город"
                                >
                                    {cities.map((item) => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Адрес:"
                                name="address"
                            >
                                <Input maxLength={30} placeholder="Введите адрес пункта выдачи" />
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

export default PointChange