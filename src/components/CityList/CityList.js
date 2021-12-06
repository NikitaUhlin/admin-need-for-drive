import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as selectors from "../../store/selectors"
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup"
import EntitiesList from "../EntitiesList/EntitiesList";
import { deleteCity } from "../../store/actions";

import RejectIcon from "../../assets/icons/RejectIcon.svg"
import EditIcon from "../../assets/icons/EditIcon.svg"

const CityList = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

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
                            onClick: () => onCityDelete(record.id)
                        },
                    ]}
                />
            ),
        },
    ];

    const onCityEdit = (id) => navigate(`/city/${id}`)

    const onCityDelete = (id) => dispatch(deleteCity(id))

    const onClickNewCity = () => navigate(`/city/create`)

    return (
        <EntitiesList
            title="Города"
            columns={columns}
            data={cities}
            loadingData={loadingData}
            onClickNewItem={onClickNewCity}
        />
    )
}

export default CityList