import React, { useEffect, useMemo, useState } from "react";
import { Card, Checkbox, Spin, Form, Select, Button, DatePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons'
import moment from 'moment';

import Layout from "../Layout/Layout"
import { changeOrder, getOrder } from "../../store/actions";
import * as selectors from "../../store/selectors"

import styles from "./orderPage.module.less"

const OrderPage = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [form] = Form.useForm();

    const order = useSelector(selectors.order)
    const cities = useSelector(selectors.cities)
    const points = useSelector(selectors.points)
    const statuses = useSelector(selectors.statuses)
    const loadingOrderItem = useSelector(selectors.loadingOrderItem)
    const loadingData = useSelector(selectors.loadingData)
    const changeOrderSuccess = useSelector(selectors.changeOrderSuccess)
    const changeOrderFailure = useSelector(selectors.changeOrderFailure)

    const [city, setCity] = useState('')

    useEffect(() => {
        if (order.id !== id)
            dispatch(getOrder(id))
        if (order.cityId)
            setCity(order.cityId.id)
    }, [order])

    useEffect(() => {
        if (changeOrderSuccess) {
            message.success('Заказ успешно изменен')
        }
    }, [changeOrderSuccess])

    useEffect(() => {
        if (changeOrderFailure) {
            message.error('Возникла ошибка, попробуйте позже')
        }
    }, [changeOrderFailure])

    const filteredPoints = useMemo(() => points.filter(data => data.cityId && data.cityId.id === city), [points, city]);

    const onChangeCity = (value) => {
        setCity(value)

        const firstPoint = points.find(data => data.cityId && data.cityId.id === value)

        form.setFieldsValue({ pointId: firstPoint ? firstPoint.id : '' })
    }

    const onFinish = (values) =>
        dispatch(changeOrder(id,
            {
                ...values,
                dateFrom: values.date[0].valueOf(),
                dateTo: values.date[1].valueOf()
            }
        ))

    const onDelete = () => {
        dispatch(changeOrder(id, { orderStatusId: "5e26a1f5099b810b946c5d8c" }))
        navigate('/orders')
    }

    return (
        <Layout>
            <div className={styles.title}>Заказ</div>
            <div className={styles.container}>
                {loadingOrderItem || loadingData ?
                    <Spin
                        size="large"
                        indicator={
                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                    />
                    :
                    <div className={styles.content}>

                        <Card>
                            <div className={styles.contentInfo}>
                                <img className={styles.img} src={order.carId.thumbnail.path} alt="" />
                                <div className={styles.name}>{order.carId.name}</div>
                                <div className={styles.category}>{order.carId.categoryId.name}</div>
                                <div className={styles.description}>{order.carId.description}</div>
                            </div>
                        </Card>

                        <div className={styles.containerForm}>
                            <Card
                                className={styles.card}
                            // style={{ marginLeft: 28 }}
                            >
                                <div className={styles.contentForm}>
                                    <Form
                                        layout="vertical"
                                        form={form}
                                        name='order'
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            label="Статус:"
                                            name="orderStatusId"
                                            initialValue={order.orderStatusId.id}
                                        >

                                            <Select>
                                                {statuses.map((item) => (
                                                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Цвет:"
                                            name="color"
                                            initialValue={order.color}
                                        >

                                            <Select>
                                                {order.carId.colors.map((item, index) => (
                                                    <Select.Option key={index} value={item}>{item}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Город:"
                                            name="cityId"
                                            initialValue={order.cityId.id}
                                        >

                                            <Select onChange={onChangeCity}>
                                                {cities.map((item) => (
                                                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Адрес:"
                                            name="pointId"
                                            initialValue={order.pointId.id}
                                        >
                                            <Select>
                                                {filteredPoints.map((item) => (
                                                    <Select.Option key={item.id} value={item.id}>{item.address}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Дата"
                                            name="date"
                                            initialValue={[moment(new Date(order.dateFrom)), moment(new Date(order.dateTo))]}
                                        >
                                            <DatePicker.RangePicker
                                                showTime
                                                format={"DD.MM.YYYY HH:mm"}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="isFullTank"
                                            valuePropName="checked"
                                            initialValue={order.isFullTank}
                                            style={{ display: 'inline-block' }}
                                        >
                                            <Checkbox>
                                                Полный бак
                                            </Checkbox>
                                        </Form.Item>

                                        <Form.Item
                                            name="isNeedChildChair"
                                            valuePropName="checked"
                                            initialValue={order.isNeedChildChair}
                                            style={{ display: 'inline-block' }}
                                        >
                                            <Checkbox>
                                                Детское кресло
                                            </Checkbox>
                                        </Form.Item>

                                        <Form.Item
                                            name="isRightWheel"
                                            valuePropName="checked"
                                            initialValue={order.isRightWheel}
                                            style={{ display: 'inline-block' }}
                                        >
                                            <Checkbox>
                                                Правый руль
                                            </Checkbox>
                                        </Form.Item>

                                        <Form.Item >
                                            <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
                                                Сохранить
                                            </Button>

                                            <Button
                                                type="primary"
                                                danger
                                                onClick={onDelete}
                                            >
                                                Удалить
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Card>
                        </div>
                    </div>
                }
            </div>
        </Layout >
    )
}

export default OrderPage