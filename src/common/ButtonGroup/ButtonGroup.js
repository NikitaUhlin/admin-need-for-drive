import classNames from "classnames";
import React from "react";

import styles from "./buttonGroup.module.less"

let cx = classNames.bind(styles)

const ButtonGroup = ({ options }) => (
    <div className={styles.container}>
        {options.map((item) => {
            const classNameButton = cx({
                [styles.button]: true,
                [styles.disabled]: item.disabled

            })
            return (
                <div
                    key={item.id}
                    className={classNameButton}
                    onClick={() => !item.disabled && item.onClick()}
                >
                    <img src={item.icon} alt='' />
                    {item.label}
                </div>
            )
        })}

    </div>
)

export default ButtonGroup
