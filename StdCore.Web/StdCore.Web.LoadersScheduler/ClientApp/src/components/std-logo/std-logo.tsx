import React from "react";
import * as styles from "./std-logo.scss";
import logo from './images/logo.png';
import cn from "classnames";

export interface IStdLogoProps {
    className?: any
}

export function StdLogo(props: IStdLogoProps) {
    return <div className={cn(styles.logoWrapper, props.className)}>
        <img src={logo} alt="календарь" className={styles.logoImage}/>
        <h1 className={styles.logoTitle}>Расписание погрузчиков</h1>
    </div>
}
