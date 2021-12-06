import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Spin, Form, Button, message, Input, Checkbox, Progress, Upload, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons'

import * as selectors from "../../store/selectors"
import Layout from "../Layout/Layout"
import { changeCar, deleteCar, getCar, postCar } from "../../store/actions";

import styles from "./carChange.module.less"

const CarChange = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [form] = Form.useForm()

    const car = useSelector(selectors.car)
    const category = useSelector(selectors.category)
    const loadingData = useSelector(selectors.loadingData)
    const loadingCarItem = useSelector(selectors.loadingCarItem)

    const [newColor, setNewColor] = useState('')
    const [colors, setColors] = useState([])
    const [selectedColors, setSelectedColors] = useState([])
    const [newImg, setNewImg] = useState({})
    const [newCategory, setNewCategory] = useState()

    useEffect(() => {
        if (id !== "create") {
            if (car.id !== id)
                dispatch(getCar(id))
            else {
                form.setFieldsValue({ name: car.name, number: car.number, priceMin: car.priceMin, priceMax: car.priceMax, categoryId: car.categoryId.id, description: car.description })
                setColors(car.colors)
                setSelectedColors(car.colors)
                setNewImg(car.thumbnail)
                setNewCategory(car.categoryId.name)
            }
        }
    }, [car])

    const onFinish = (values) => {
        if (!newImg.path) {
            message.error('Необходимо загрузить фото')
            return
        }
        if (id !== "create")
            dispatch(changeCar(id, {
                ...values,
                colors,
                categoryId: category.find((item) => item.id === values.categoryId),
                thumbnail: newImg
            }))
        else
            dispatch(postCar({
                ...values,
                colors,
                categoryId: category.find((item) => item.id === values.categoryId),
                thumbnail: newImg,
                tank: 100
            }))

        navigate('/cars')
    }

    const onDelete = () => {
        dispatch(deleteCar(id))
        navigate('/cars')
    }

    const onChangeNewColor = (e) => {
        setNewColor(e.target.value)
    }

    const onClickNewColor = () => {
        if (!colors.includes(newColor)) {
            setColors([...colors, newColor])
            onChangeColor(newColor)
            setNewColor('')
        }
    }

    const onChangeColor = (color) => {
        if (selectedColors.includes(color))
            setSelectedColors(selectedColors.filter((item) => item !== color))
        else
            setSelectedColors([...selectedColors, color])
    }

    const onDownloadFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setNewImg({
                mimetype: file.file.originFileObj.type,
                originalname: file.file.originFileObj.name,
                path: reader.result,
                size: file.file.originFileObj.size,
            })
        };
        reader.readAsDataURL(file.file.originFileObj);
    }

    const onChangeCategory = (e) => setNewCategory(category.find((item) => item.id === e).name)

    return (
        <Layout>
            <div className={styles.title}>
                {id === "create" ? "Создание авто" : "Изменение "}
            </div>

            {(loadingCarItem && id !== "create") || loadingData ?
                <Spin
                    size="large"
                    indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                />
                :
                <div className={styles.container}>
                    <div className={styles.containerCar}>
                        <Card>
                            <div className={styles.contentCar}>
                                <img className={styles.img} src={newImg.path} alt='' />
                                <div className={styles.name}>{id !== "create" && car.name}</div>
                                <div className={styles.category}>{newCategory}</div>
                                <div className={styles.file}>
                                    <Upload.Dragger name="files" action="" maxCount={1} onChange={onDownloadFile}>
                                        <p className="ant-upload-text">Нажмите или перетените картинку для загрузки</p>
                                        <p className="ant-upload-hint">Доступные форматы PNG, JPG</p>
                                    </Upload.Dragger>
                                </div>
                                {id !== "create" &&
                                    <>
                                        <div className={styles.tank}>
                                            Заполнено:
                                            <Progress percent={car.tank} />
                                        </div>
                                        <div className={styles.description}>
                                            <div className={styles.descriptionTitle}>Описание</div>
                                            {car.description}
                                        </div>
                                    </>
                                }
                            </div>
                        </Card>
                    </div>
                    <Card style={{ width: '100%' }}>
                        <div className={styles.content}>
                            <Form
                                layout="vertical"
                                form={form}
                                name='car'
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Название:"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Не может быть пустым',
                                        },
                                    ]}
                                >
                                    <Input maxLength={18} placeholder="Введите название авто" />
                                </Form.Item>
                                <Form.Item
                                    label="Описание:"
                                    name="description"
                                >
                                    <Input.TextArea placeholder="Введите описание" />
                                </Form.Item>
                                <Form.Item
                                    label="Минимальная цена:"
                                    name="priceMin"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Не может быть пустым',
                                        },
                                    ]}
                                >
                                    <Input type="number" placeholder="Введите минимальную цену" />
                                </Form.Item>
                                <Form.Item
                                    label="Максимальная цена:"
                                    name="priceMax"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Не может быть пустым',
                                        },
                                    ]}
                                >
                                    <Input type="number" placeholder="Введите максимальную цену" />
                                </Form.Item>
                                <Form.Item
                                    label="Категория:"
                                    name="categoryId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Не может быть пустым',
                                        },
                                    ]}
                                >

                                    <Select
                                        onChange={onChangeCategory}
                                        placeholder="Выберите категорию"
                                    >
                                        {category.map((item) => (
                                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Номер:"
                                    name="number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Не может быть пустым',
                                        },
                                    ]}
                                >
                                    <Input maxLength={18} placeholder="Введите номер авто" />
                                </Form.Item>
                                <Form.Item
                                    label="Доступные цвета:"
                                >
                                    <div className={styles.colorInput}>
                                        <Input value={newColor} onChange={onChangeNewColor} maxLength={10} placeholder="Введите новый цвет" />
                                        <Button
                                            onClick={onClickNewColor}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    {colors.map((item) => (
                                        <div>
                                            <Checkbox checked={selectedColors.includes(item)} onChange={() => onChangeColor(item)}>
                                                {item}
                                            </Checkbox>
                                        </div>
                                    ))}
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
                        </div>
                    </Card>
                </div>
            }
        </Layout>
    )
}

export default CarChange