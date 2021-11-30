import React, { useEffect, useState } from "react";
import { Card, message, Pagination, Spin, Empty } from "antd";
import { useNavigate } from "react-router";
import Layout from "../Layout/Layout"
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons'

import * as selectors from "../../store/selectors"
import CheckboxAdd from "../../common/CheckboxAdd/CheckboxAdd";
import { formatDate } from "../../utils/formattedDate"
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup"

import { changeOrder, getOrders, messageTrigger } from "../../store/actions";
import getImgPath from "../../utils/getImgPath";
import Filter from "../../common/Filter/Filter";
import { optionsFilterDate } from "../../constants/optionsFilterDate";

import CheckGreen from "../../assets/icons/CheckGreen.svg"
import RejectIcon from "../../assets/icons/RejectIcon.svg"
import EditIcon from "../../assets/icons/EditIcon.svg"

import styles from "./orderList.module.less"

const OrderList = () => {
    const orders = useSelector(selectors.orders)
    const loading = useSelector(selectors.loading)
    const loadingData = useSelector(selectors.loadingData)
    const countOrder = useSelector(selectors.countOrder)
    const cars = useSelector(selectors.cars)
    const cities = useSelector(selectors.cities)
    const statuses = useSelector(selectors.statuses)
    const changeOrderSuccess = useSelector(selectors.changeOrderSuccess)

    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (!orders.length)
            dispatch(getOrders(1))
    }, [])

    useEffect(() => {
        if (changeOrderSuccess) {
            message.success('Статус заказа изменен')
            dispatch(messageTrigger())
        }
    }, [changeOrderSuccess])

    const onUpdateChange = (newPage) => {
        setPage(newPage)
        dispatch(getOrders(newPage, filter))
    }

    const onFilter = (data) => {
        const filterDate = optionsFilterDate.find((item) => item.id === data["createdAt[$gt]"])
        const filteredData = {
            ...data,
            "createdAt[$gt]": filterDate && new Date().getTime() - filterDate.time,
        }
        setPage(1)
        dispatch(getOrders(1, filteredData))
        setFilter(filteredData)
    }

    const onClear = () => {
        setFilter({})
        setPage(1)
        dispatch(getOrders(1, {}))
    }

    const onOrderAccept = (id, item) => {

        dispatch(changeOrder(id, { orderStatusId: "5e26a1f0099b810b946c5d8b" }))
    }
    const onOrderCancel = (id) => dispatch(changeOrder(id, { orderStatusId: "5e26a1f5099b810b946c5d8c" }))

    const onOrderEdit = (id) => navigate(`/order/${id}`)

    return (
        <Layout>
            <div className={styles.title}>Заказы</div>
            <Card >
                <div className={styles.filter}>
                    {loadingData ?
                        <Spin
                            size="large"
                            indicator={
                                <LoadingOutlined style={{ fontSize: 24 }} spin />
                            }
                        />
                        :
                        <Filter
                            onFilter={onFilter}
                            onClear={onClear}
                            filters={[
                                {
                                    options: optionsFilterDate,
                                    placeholder: "Период",
                                    label: "createdAt[$gt]"
                                }, {
                                    options: cars,
                                    placeholder: "Авто",
                                    label: "carId"
                                }, {
                                    options: cities,
                                    placeholder: "Город",
                                    label: "cityId"
                                }, {
                                    options: statuses,
                                    placeholder: "Статус",
                                    label: "orderStatusId"
                                }
                            ]}
                        />
                    }
                </div>

                {loading ?
                    <div className={styles.spinner}>
                        <Spin
                            size="large"
                            indicator={
                                <LoadingOutlined style={{ fontSize: 34 }} spin />
                            }
                        />
                    </div> :
                    orders.length ?
                        orders.map((item) => (
                            <div key={item.id} className={styles.order}>
                                <img className={styles.img} src={item.carId && getImgPath(item.carId.thumbnail.path)} alt='' />
                                <div className={styles.carInfo}>
                                    <div>
                                        <span>
                                            {item.carId && item.carId.name}
                                        </span> в <span>
                                            {item.cityId && item.cityId.name}
                                        </span>, {item.pointId && item.pointId.address}
                                    </div>
                                    <div>
                                        {formatDate(new Date(item.dateFrom))} — {formatDate(new Date(item.dateTo))}
                                    </div>
                                    <div>
                                        Цвет: <span>{item.color}</span>
                                    </div>
                                </div>
                                <div className={styles.additional}>
                                    <CheckboxAdd active={item.isFullTank}>Полный бак</CheckboxAdd>
                                    <CheckboxAdd active={item.isNeedChildChair}>Детское кресло</CheckboxAdd>
                                    <CheckboxAdd active={item.isRightWheel}>Правый руль</CheckboxAdd>
                                </div>
                                <div className={styles.price}>
                                    {item.price} ₽
                                </div>
                                <div className={styles.buttonGroup}>
                                    <ButtonGroup
                                        options={[
                                            { id: 1, label: 'Готово', icon: CheckGreen, onClick: () => onOrderAccept(item.id, item.orderStatusId.name), disabled: item.orderStatusId.name === "Подтвержденные" },
                                            { id: 2, label: 'Отмена', icon: RejectIcon, onClick: () => onOrderCancel(item.id), disabled: item.orderStatusId.name === "Отмененые" },
                                            { id: 3, label: 'Изменить', icon: EditIcon, onClick: () => onOrderEdit(item.id) },
                                        ]}
                                    />
                                </div>
                            </div>
                        )
                        ) : <Empty description="Заказы не найдены" />}

                <div className={styles.pagination}>
                    <Pagination
                        current={page}
                        size="small"
                        pageSize={1}
                        onChange={onUpdateChange}
                        hideOnSinglePage={true}
                        showSizeChanger={false}
                        total={Math.ceil(countOrder / 6)}
                    />
                </div>
            </Card>
        </Layout>
    )
}

export default OrderList