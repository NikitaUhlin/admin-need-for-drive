import React, { useState } from "react";

import Footer from "../../common/Footer/Footer"
import Sidebar from "../../common/Sidebar/Sidebar";
import Header from "../../common/Header/Header";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import styles from "./layout.module.less"
import { Button } from "antd";

const Layout = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <>
            <Header />
            <Sidebar menuOpen={menuOpen} />
            <div className={styles.buttonMenu}>
                <Button
                    type="primary"
                    onClick={toggleMenu}
                >
                    {React.createElement(menuOpen ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
            </div>
            <div className={styles.content}>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout