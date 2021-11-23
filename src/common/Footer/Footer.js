import React from "react";

import styles from "./footer.module.less"

const Footer = () => {
    return (
        <div className={styles.container}>
            <a className={styles.link} href="https://nikitauhlin.github.io/need-for-drive/#/">Главная страница</a>
            <div className={styles.label}>Copyright © 2021 Simbirsoft</div>
        </div>
    )
}

export default Footer