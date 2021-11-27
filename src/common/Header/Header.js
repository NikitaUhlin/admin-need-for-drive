import React from "react";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Ring from "../../assets/icons/Ring.svg";
import DropdownIcon from "../../assets/icons/DropdownIcon.svg"
import Avatar from "../../assets/img/Avatar.png"

import styles from "./header.module.less"

const Header = () => (
    <div className={styles.container}>
        <Input
            style={{ border: "none" }}
            placeholder="Поиск..."
            prefix={<SearchOutlined />}

        />
        <div className={styles.space}></div>
        <div className={styles.ring}>
            <img src={Ring} alt='' />
        </div>
        <div className={styles.info}>
            <img src={Avatar} alt='' />
            <div className={styles.name}>Admin</div>
            <img className={styles.dropdownIcon} src={DropdownIcon} alt='' />
        </div>
    </div>
)

export default Header