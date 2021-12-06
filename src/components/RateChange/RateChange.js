import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Spin, Form, Button, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons'

import * as selectors from "../../store/selectors"
import Layout from "../Layout/Layout"

import { changeRate, deleteRate, getRateItem, getRateType, postRate } from "../../store/actions";

import styles from "./rateChange.module.less"

const RateChange = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [form] = Form.useForm()

    const rateItem = useSelector(selectors.rateItem)
    const rateType = useSelector(selectors.rateType)
    const loadingRateItem = useSelector(selectors.loadingRateItem)
    const loadingRateType = useSelector(selectors.loadingRateType)

    useEffect(() => {
        if (id !== "create") {
            if (rateItem.id !== id) {
                dispatch(getRateItem(id))
                dispatch(getRateType())
            }
            else
                form.setFieldsValue({ rateTypeId: rateItem.rateTypeId && rateItem.rateTypeId.id, price: rateItem.price })
        }
        else
            dispatch(getRateType())
    }, [rateItem])

    const onFinish = (values) => {
        if (id !== "create")
            dispatch(changeRate(id, {
                ...values,
                rateTypeId: rateType.find((item) => values.rateTypeId === item.id)
            }))
        else
            dispatch(postRate({
                ...values,
                rateTypeId: rateType.find((item) => values.rateTypeId === item.id)
            }))

        navigate('/rates')
    }
    const onDelete = () => {
        dispatch(deleteRate(id))
        navigate('/rates')
    }

    return (
        <Layout>
            <div className={styles.title}>
                {id === "create" ? "Создание тарифа" : "Изменение тарифа"}
            </div>
            <Card>
                {(loadingRateItem && id !== "create") || loadingRateType ?
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
                            name='rate'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Название:"
                                name="rateTypeId"
                            >

                                <Select placeholder="Выберите вид тарифа">
                                    {rateType.map((item) => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Цена за еденицу измерения:"
                                name="price"
                            >
                                <Input type="number" placeholder="Введите цену" />
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

export default RateChange