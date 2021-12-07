import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Tag } from "antd";

import * as selectors from "../../store/selectors"
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup"
import EntitiesList from "../EntitiesList/EntitiesList";
import { deleteCar, messageTrigger } from "../../store/actions";

import RejectIcon from "../../assets/icons/RejectIcon.svg"
import EditIcon from "../../assets/icons/EditIcon.svg"

const CarsList = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const cars = useSelector(selectors.cars)
    const category = useSelector(selectors.category)
    const loadingData = useSelector(selectors.loadingData)
    const changeCarSuccess = useSelector(selectors.changeCarSuccess)

    useEffect(() => {
        if (changeCarSuccess) {
            message.success('Автомобиль успешно изменен').then(() => dispatch(messageTrigger()))
        }
    }, [changeCarSuccess])

    const filtersCarCategory = useMemo(() => category.map(item => ({ text: item.name, value: item.name })), [category]);

    const columns = [
        {
            title: 'Имя',
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
            title: 'Номер',
            dataIndex: 'number',
            responsive: ['lg'],
            width: '14%',
            key: 'number',
        },
        {
            title: 'Категория',
            dataIndex: ['categoryId', 'name'],
            responsive: ['md'],
            width: '14%',
            key: 'category',
            filters: filtersCarCategory,
            onFilter: (value, record) => record.categoryId && record.categoryId.name.indexOf(value) > -1,
        },
        {
            title: 'Цвета',
            key: 'colors',
            dataIndex: 'colors',
            responsive: ['lg'],
            width: '40%',
            render: colors => (
                <>
                    {colors.map(item => {
                        let color
                        switch (item.toUpperCase()) {
                            case 'КРАСНЫЙ':
                            case 'АЛЫЙ':
                                color = 'red'
                                break;
                            case 'СИНИЙ':
                            case 'ГОЛУБОЙ':
                                color = 'blue'
                                break;
                            case 'ОРАНЖЕВЫЙ':
                                color = 'orange'
                                break;
                            case 'СЕРЫЙ':
                                color = 'darkgrey'
                                break;
                            case 'ЧЕРНЫЙ':
                                color = 'grey'
                                break;
                            case 'ЖЕЛТЫЙ':
                            case 'ЖЁЛТЫЙ':
                                color = 'gold'
                                break;
                            case 'ЗЕЛЕНЫЙ':
                                color = 'green'
                                break;

                            default:
                                break;
                        }


                        return (
                            <Tag color={color} key={item}>
                                {item.toLowerCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
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
                            onClick: () => onCarEdit(record.id)
                        },
                        {
                            id: 2,
                            label: 'Удалить',
                            icon: RejectIcon,
                            onClick: () => onCarDelete(record.id)
                        },
                    ]}
                />
            ),
        },
    ];

    const onCarEdit = (id) => navigate(`/car/${id}`)

    const onCarDelete = (id) => dispatch(deleteCar(id))

    const onClickNewCar = () => navigate('/car/create')

    return (
        <EntitiesList
            title="Автомобили"
            columns={columns}
            data={cars}
            loadingData={loadingData}
            onClickNewItem={onClickNewCar}
        />
    )
}

export default CarsList