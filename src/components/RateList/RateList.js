import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as selectors from "../../store/selectors"
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup"
import EntitiesList from "../EntitiesList/EntitiesList";

import RejectIcon from "../../assets/icons/RejectIcon.svg"
import EditIcon from "../../assets/icons/EditIcon.svg"
import { deleteRate, messageTrigger } from "../../store/actions";
import { message } from "antd";

const RateList = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const rate = useSelector(selectors.rate)
    const loadingData = useSelector(selectors.loadingData)
    const changeRateSuccess = useSelector(selectors.changeRateSuccess)

    useEffect(() => {
        if (changeRateSuccess) {
            message.success('Тариф успешно изменен').then(() => dispatch(messageTrigger()))
        }
    }, [changeRateSuccess])

    const columns = [
        {
            title: 'Название',
            dataIndex: ['rateTypeId', 'name'],
            key: 'name',
            sorter: (a, b) => {
                const nameA = a.rateTypeId.name.toLowerCase(), nameB = b.rateTypeId.name.toLowerCase()
                if (nameA < nameB)
                    return -1
                if (nameA > nameB)
                    return 1
                return 0
            }
        },
        {
            title: 'Описание',
            dataIndex: ['rateTypeId', 'unit'],
            responsive: ['md'],
            width: '14%',
            key: 'unit',


        },
        {
            title: 'Цена',
            dataIndex: 'price',
            responsive: ['md'],
            width: '14%',
            key: 'price',


        },
        {
            title: 'Действия',
            key: 'action',
            width: '14%',
            render: (text, record) => (
                <ButtonGroup
                    options={[
                        {
                            id: 1,
                            label: 'Изменить',
                            icon: EditIcon,
                            onClick: () => onRateEdit(record.id)
                        },
                        {
                            id: 2,
                            label: 'Удалить',
                            icon: RejectIcon,
                            onClick: () => onRateDelete(record.id)
                        },
                    ]}
                />
            ),
        },
    ];

    const onRateEdit = (id) => navigate(`/rate/${id}`)

    const onRateDelete = (id) => dispatch(deleteRate(id))

    const onClickNewRate = () => navigate(`/rate/create`)

    return (
        <EntitiesList
            title="Тарифы"
            columns={columns}
            data={rate}
            loadingData={loadingData}
            onClickNewItem={onClickNewRate}
        />
    )
}

export default RateList