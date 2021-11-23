import React from "react";

import styles from "./buttonGroup.module.less"

const ButtonGroup = ({ options }) => (
    <div className={styles.container}>
        {options.map((item) => (
            <div
                key={item.id}
                className={styles.button}
                onClick={item.onClick}
            >
                <img src={item.icon} alt='' />
                {item.label}
            </div>
        ))}

    </div>
)

export default ButtonGroup
