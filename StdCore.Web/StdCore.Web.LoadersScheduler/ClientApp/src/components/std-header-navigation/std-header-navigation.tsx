import React, {PropsWithChildren} from "react";
import * as styles from "./std-header-navigation.scss";
import {NavLink} from "react-router-dom";
import cn from "classnames";

export interface INavigationItem {
    text: string,
    to: string
}

export interface IStdHeaderNavigationProps {
    navigationItems: Array<INavigationItem>,
    className?: any
}

export function StdHeaderNavigation(props: PropsWithChildren<IStdHeaderNavigationProps>) {
    return <nav className={cn(styles.navigationWrapper, props.className)}>
        <ul className={styles.navigationItems}>
            {props.navigationItems.map((item, idx) => <NavLink
                key={idx}
                to={item.to}
                className={styles.navigationItem}
            >
                {item.text}
            </NavLink>)}
        </ul>
    </nav>
}
