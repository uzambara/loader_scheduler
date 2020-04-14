import React, {useState} from "react";
import {Button, Dialog, TextField} from "@material-ui/core";
import * as styles from "./login.page.scss";
import {Link as RouterLink} from "react-router-dom";
import {AuthorizeService} from "../../services/authorize.service";
import {ResponseStatus} from "../../contracts/response-status";
import {useDispatch} from "react-redux";
import {SetUser} from "../../redux/actions/authorize.actions";
import {useProcessing} from "../../hooks/useProcessing";
import {StdProcessing} from "../../components/std-processing/std-processing";
import {useHistory} from "react-router";
import {Routes} from "../../routing/api-routes";

export function LoginPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const processingHook = useProcessing();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const loginAction = async (ev) => {
        ev.preventDefault();
        processingHook.setProgress();
        let authorizeResult = await AuthorizeService.Login(login, password);
        processingHook.setComplete(null);

        if(authorizeResult.status == ResponseStatus.Success) {
            dispatch(SetUser(authorizeResult.user));
            history.push(Routes.calendar);
        } else {
            processingHook.setErrors([authorizeResult.message]);
        }
    };

    return <Dialog
        hideBackdrop={true}
        open={true}
    >
        <form className={styles.loginForm} onSubmit={loginAction}>
            <h1 className={styles.title}>Вход</h1>
            <TextField
                margin={"normal"}
                label="Логин"
                variant="outlined"
                size="small"
                onChange={(ev) => setLogin(ev.target.value)}
            />
            <TextField
                margin={"normal"}
                label="Пароль"
                variant="outlined"
                size="small"
                type="password"
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <StdProcessing processingStatus={processingHook.processingStatus} errorMessages={processingHook.statusMessages}/>
            <div className={styles.buttonsWrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={loginAction}
                >
                    Войти
                </Button>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to={Routes.registration}
                >
                    Регистрация
                </Button>
            </div>
        </form>
    </Dialog>
}
