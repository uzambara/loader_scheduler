import React, {useState} from "react";
import {Button, Dialog, TextField} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom"
import * as styles from "./registration.page.scss";
import {IRegistrationData, registrationPageLogic} from "./registration.page.logic";
import {Alert} from "@material-ui/lab";
import {StdErrorMessages} from "../../components/std-error-messages/std-error-messages";
import {ResponseStatus} from "../../contracts/response-status";
import {Routes} from "../../routing/api-routes";

export function RegistrationPage() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errors, setErrors] = useState([]);
    const [registrationResult, setRegistrationResult] = useState("");
    const clearForm = () => {
        setName("");
        setLastName("");
        setLogin("");
        setPassword("");
        setPasswordRepeat("");
    };

    const onRegistrationClick = async () => {
        let registrationData: IRegistrationData = {
            name,
            lastName,
            login,
            password,
            passwordRepeat
        };
        let validationResult = registrationPageLogic.validate(registrationData);

        if(!validationResult.isValid) {
            setErrors(validationResult.errors);
            setTimeout(() => setErrors([]), 4000);
            return;
        }

        let registrationResult = await registrationPageLogic.register(registrationData);
        if(registrationResult.status == ResponseStatus.Success) {
            clearForm();
            setRegistrationResult("Регистрация прошла успешно. Перейдите на страницу входа.");
            setTimeout(() => setRegistrationResult(""), 4000);
        } else {
            setErrors([registrationResult.message]);
            setTimeout(() => setErrors([]), 4000);
        }
    };

    return <Dialog
        open={true}
        hideBackdrop={true}
    >
        <div className={styles.registrationForm}>
            <h1 className={styles.title}>Регистрация</h1>
            <TextField
                margin={"normal"}
                label="Имя"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                variant="outlined"
                size="small"
            />
            <TextField
                margin={"normal"}
                label="Фамилия"
                value={lastName}
                onChange={(ev) => setLastName(ev.target.value)}
                variant="outlined"
                size="small"
            />
            <TextField
                margin={"normal"}
                label="Логин"
                value={login}
                onChange={(ev) => setLogin(ev.target.value)}
                variant="outlined"
                size="small"
            />
            <TextField
                margin={"normal"}
                label="Пароль"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                variant="outlined"
                size="small"
                type="password"
            />
            <TextField
                margin={"normal"}
                label="Пароль"
                value={passwordRepeat}
                onChange={(ev) => setPasswordRepeat(ev.target.value)}
                variant="outlined"
                size="small"
                type="password"
            />
            {errors.length > 0 && <Alert severity="error">
                <StdErrorMessages messages={errors}/>
            </Alert>}
            {registrationResult && <Alert severity="success">
                {registrationResult}
            </Alert>}
            <div className={styles.buttonsWrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onRegistrationClick}
                >
                    Создать
                </Button>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to={Routes.login}
                >
                    Вход
                </Button>
            </div>
        </div>
    </Dialog>
}
