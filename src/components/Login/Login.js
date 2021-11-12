import React, { useEffect } from "react";
import { Alert, Button, Card, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import LogoIcon from "../../assets/icons/LogoIcon.svg"

import * as selectors from "../../store/selectors"
import { getAuthToken } from "../../store/actions";
import styles from "./login.module.less"

const Login = () => {
    const loading = useSelector(selectors.loading)
    const auth = useSelector(selectors.auth)
    const error = useSelector(selectors.error)

    const dispatch = useDispatch()

    useEffect(() => {
        if (auth)
            message.success('Вы авторизованы!')
    }, [auth])

    const onFinish = (data) => dispatch(getAuthToken(data))

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <img src={LogoIcon} alt="" />
                <div className={styles.title}>Need for drive</div>
            </div>
            <Card style={{
                width: 376
            }}>
                <div className={styles.subtitle}>Вход</div>
                <Form
                    name="normal_login"
                    layout="vertical"
                    requiredMark={false}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        label="Почта"
                        rules={[{ required: true, message: 'Пожалуйста введите почту!' }]}
                    >
                        <Input type="text" placeholder="Почта" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                    >
                        <Input
                            type="password"
                            placeholder="Пароль"
                        />
                    </Form.Item>
                    {error && <Alert message="Неверный логин или пароль!" type="error" />}
                    <div className={styles.buttonContainer}>
                        <Form.Item>
                            <a className={styles.link} href="#">
                                Запросить доступ
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={loading}
                                type="primary"
                                htmlType="submit"
                                className={styles.button}>
                                Войти
                            </Button>
                        </Form.Item>

                    </div>
                </Form>
            </Card>
        </div>
    )
}
export default Login