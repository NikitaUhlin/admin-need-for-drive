import React from "react";
import { Button, Card, Form, Input } from "antd";

import LogoIcon from "../../assets/icons/LogoIcon.svg"

import styles from "./login.module.less"

const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <img src={LogoIcon} alt="" />
                <div className={styles.title}>Need for drive</div>
            </div>
            <Card style={{
                width: 376,
                borderRadius: 9
            }}>
                <div className={styles.subtitle}>Вход</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                // onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <div className={styles.label}>Почта</div>
                        <Input type="email" placeholder="Почта" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <div className={styles.label}>Пароль</div>
                        <Input
                            type="password"
                            placeholder="Пароль"
                        />
                    </Form.Item>
                    <div className={styles.buttonContainer}>
                        <Form.Item>
                            <a className={styles.link} href="">
                                Запросить доступ
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.button}>
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