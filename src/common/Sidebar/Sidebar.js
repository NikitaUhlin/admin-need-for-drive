import React from "react";
import LogoIcon from "../../assets/icons/LogoIcon.svg"
import { UnorderedListOutlined, DiffOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import "./menuItem.less"
import styles from "./sidebar.module.less"
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

let cx = classNames.bind(styles)

const menuItems = ['orders', 'cars']

const Sidebar = ({ menuOpen }) => {
    const classNameMenu = cx({
        [styles.container]: true,
        [styles.menuOpen]: menuOpen
    })

    const navigate = useNavigate()

    const onChange = (item) =>
        navigate(`/${menuItems[item.key - 1]}`)

    return (
        <div className={classNameMenu}>
            <Menu
                onClick={onChange}
                className={styles.content}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
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

                <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                    Список авто
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Sidebar