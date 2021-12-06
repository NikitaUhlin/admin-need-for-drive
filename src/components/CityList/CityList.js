import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import * as selectors from "../../store/selectors"
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup"
import EntitiesList from "../EntitiesList/EntitiesList";

import RejectIcon from "../../assets/icons/RejectIcon.svg"
import EditIcon from "../../assets/icons/EditIcon.svg"

const CityList = () => {
    const navigate = useNavigate()

    const cities = useSelector(selectors.cities)
    const loadingData = useSelector(selectors.loadingData)

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
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <ButtonGroup
                    options={[
                        {
                            id: 1,
                            label: 'Изменить',
                            icon: EditIcon,
                            onClick: () => onCityEdit(record.id)
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

    const onCityEdit = (id) => navigate(`/city/${id}`)

    return (
        <EntitiesList
            title="Пункты выдачи"
            columns={columns}
            data={cities}
            loadingData={loadingData}
        />
    )
}

export default CityList