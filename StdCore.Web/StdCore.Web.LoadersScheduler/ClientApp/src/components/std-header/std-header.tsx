import React, {PropsWithChildren} from "react";
import {StdLogo} from "../std-logo/std-logo";
import {StdUserMenu} from "../std-user-menu/std-user-menu";
import * as styles from "./std-header.scss";
import {INavigationItem, StdHeaderNavigation} from "../std-header-navigation/std-header-navigation";
import {useDispatch} from "react-redux";
import {AuthorizeService} from "../../services/authorize.service";
import {SetUser} from "../../redux/actions/authorize.actions";
import {StdClock} from "../std-clock/std-clock";
import {Routes} from "../../routing/api-routes";

const navigationItems: Array<INavigationItem> = [
    {text: "На главную", to: Routes.calendar},
    {text: "Отчет ФМ", to: Routes.report}
];

export function StdHeader(props: PropsWithChildren<any>) {
    const dispatch = useDispatch();
    const logout = async () => {
        await AuthorizeService.Logout();
        dispatch(SetUser(null));
    };

    return <header className={styles.headerContainer}>
        <div className={styles.headerTopPart}>
            <StdLogo className={styles.logo}/>
            <StdClock/>
            <StdUserMenu
                className={styles.userMenu}
                userName={"Admin admin adminovich"}
                menuItems={[{text: "Выйти", onClick: logout}]}
            />
        </div>
        <StdHeaderNavigation className={styles.headerNavigation} navigationItems={navigationItems}/>
        {
            props.children
        }
    </header>
}
