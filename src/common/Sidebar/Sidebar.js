import React, { useEffect, useState } from "react";
import {
    EnvironmentOutlined,
    DiffOutlined,
    CarOutlined,
    DollarOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";

import LogoIcon from "../../assets/icons/LogoIcon.svg"

import "./menuItem.less"
import styles from "./sidebar.module.less"

let cx = classNames.bind(styles)

const menuItems = ['orders', 'cars', 'points', 'rates', 'cities']

const Sidebar = ({ menuOpen }) => {
    const classNameMenu = cx({
        [styles.container]: true,
        [styles.menuOpen]: menuOpen
    })

    const [page, setPage] = useState()

    const navigate = useNavigate()

    let location = useLocation();

    useEffect(() => {
        setPage(menuItems.indexOf(location.pathname.replace('/', '')) + 1)
    }, [])
    const onChange = (item) => {
        navigate(`/${menuItems[item.key - 1]}`)
    }

    return (
        <div className={classNameMenu}>
            <Menu
                onClick={onChange}
                className={styles.content}
                style={{ width: 256 }}
                selectedKeys={[`${page}`]}
                mode="inline"
            >
                <Menu.ItemGroup key="0">
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src={LogoIcon} alt="" />
                        <div className={styles.title}>Need for drive</div>
                    </div>
                </Menu.ItemGroup>

                <Menu.Item key="1" icon={<DiffOutlined />}>
                    Заказы
                </Menu.Item>

                <Menu.Item key="2" icon={<CarOutlined />}>
                    Автомобили
                </Menu.Item>

                <Menu.Item key="3" icon={<EnvironmentOutlined />}>
                    Пункты выдачи
                </Menu.Item>

                <Menu.Item key="4" icon={<DollarOutlined />}>
                    Тарифы
                </Menu.Item>

                <Menu.Item key="5" icon={<HomeOutlined />}>
                    Города
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Sidebar