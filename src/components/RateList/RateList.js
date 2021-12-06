import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import * as selectors from "../../store/selectors"
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup"
import EntitiesList from "../EntitiesList/EntitiesList";

import RejectIcon from "../../assets/icons/RejectIcon.svg"
import EditIcon from "../../assets/icons/EditIcon.svg"

const RateList = () => {
    const navigate = useNavigate()

    const rate = useSelector(selectors.rate)
    const loadingData = useSelector(selectors.loadingData)

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
            key: 'unit',


        },
        {
            title: 'Цена',
            dataIndex: 'price',
            responsive: ['md'],
            key: 'price',


        },
        {
            title: 'Действия',
            key: 'action',
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
                            // onClick: () => onOrderCancel(item.id) 
                        },
                    ]}
                />
            ),
        },
    ];

    const onRateEdit = (id) => navigate(`/rate/${id}`)

    return (
        <EntitiesList
            title="Тарифы"
            columns={columns}
            data={rate}
            loadingData={loadingData}
        />
    )
}

export default RateList