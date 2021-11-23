import classNames from "classnames";
import React from "react";

import Check from "../../assets/icons/Check.svg"

import styles from "./checkboxAdd.module.less"

let cx = classNames.bind(styles)

const CheckboxAdd = ({ children, active }) => {
    const classNameBox = cx({
        [styles.box]: true,
        [styles.active]: active,
    })

    return (
        <div className={styles.container}>
            <div className={classNameBox}>
                {active && <img className={styles.img} src={Check} alt="" />}
            </div>
            <div>{children}</div>
        </div>
    )
}

export default CheckboxAdd