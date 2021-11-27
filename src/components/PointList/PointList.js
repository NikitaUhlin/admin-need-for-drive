import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import * as selectors from "../../store/selectors"
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup"
import EntitiesList from "../EntitiesList/EntitiesList";

import RejectIcon from "../../assets/icons/RejectIcon.svg"
import EditIcon from "../../assets/icons/EditIcon.svg"

const PointList = () => {
    const navigate = useNavigate()

    const points = useSelector(selectors.points)
    const loadingData = useSelector(selectors.loadingData)

    const filtersPointCity = useMemo(() => {
        const result = []
        for (let i = 0; i < points.length; i++) {
            if (!result.find((item) => item.text === points[i].cityId.name))
                result.push({ text: points[i].cityId.name, value: points[i].cityId.name })
        }
        return result
    }, [points]);

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => {
                const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                if (nameA < nameB)
                    return -1
                if (nameA > nameB)
                    return 1
                return 0
            }
        },
        {
            title: 'Город',
            dataIndex: ['cityId', 'name'],
            key: 'city',
            filters: filtersPointCity,
            responsive: ['md'],
            onFilter: (value, record) => record.cityId.name.indexOf(value) > -1,

        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            responsive: ['lg'],
            key: 'address',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <ButtonGroup
                    options={[
                        {
                            id: 1,
                            label: 'Изменить',
                            icon: EditIcon,
                            onClick: () => onPointEdit(record.id)
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

    const onPointEdit = (id) => navigate(`/point/${id}`)

    return (
        <EntitiesList
            title="Пункты выдачи"
            columns={columns}
            data={points}
            loadingData={loadingData}
        />
    )
}

export default PointList