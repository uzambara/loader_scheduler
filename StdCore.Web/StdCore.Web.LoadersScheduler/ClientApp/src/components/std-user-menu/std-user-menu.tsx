import userImage from "./images/user.jpg";
import * as styles from "./std-user-menu.scss";
import React from "react";
import cn from "classnames";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/selectors/authorize.selectors";

export interface IStdUserMenuItem {
    text: string,
    onClick: () => void
}

export interface IStdUserMenuProps {
    userName: string,
    menuItems: IStdUserMenuItem[],
    className?: any
}

export function StdUserMenu(props: IStdUserMenuProps) {
    const user = useSelector(selectCurrentUser) || {name: "", lastName: ""};
    return <div className={cn(styles.userMenuWrapper, props.className)}>
        <img className={styles.userImage} src={userImage}/>
        <span className={styles.userName}>{`${user.name} ${user.lastName}`}</span>
        <ul className={styles.menu}>
            {props.menuItems.map((i, idx) => <li
                key={idx}
                className={styles.menuItem}
                onClick={() => i.onClick && i.onClick()}>
                    {i.text}
            </li>)}
        </ul>
    </div>
}
