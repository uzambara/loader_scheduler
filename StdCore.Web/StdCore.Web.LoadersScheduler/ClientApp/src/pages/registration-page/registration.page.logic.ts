import {AuthorizeService} from "../../services/authorize.service";
import {IValid} from "../../models/common/IValid";
import {IAccountRegisterResponse} from "../../contracts/account/account-contract";

export interface IRegistrationData {
    login: string,
    password: string,
    passwordRepeat: string,
    name: string,
    lastName: string
}

async function register(registrationData: IRegistrationData): Promise<IAccountRegisterResponse> {
    let {login, password, name, lastName} = registrationData;
    return AuthorizeService.Register(login, password, name, lastName);
}

function validate(registrationData: IRegistrationData): IValid {
    let result: IValid = {
        isValid: true,
        errors: []
    };

    if(!registrationData.login) {
        result.errors.push("Введите логин.")
    }

    if(!registrationData.name) {
        result.errors.push("Введите имя.")
    }

    if(!registrationData.lastName) {
        result.errors.push("Введите фамилию.")
    }

    if(!registrationData.password) {
        result.errors.push("Введите пароль.")
    }

    if(registrationData.password !== registrationData.passwordRepeat) {
        result.errors.push("Пароли не совпадают.")
    }

    result.isValid = result.errors.length === 0;
    return result;
}

export const registrationPageLogic = {
    register,
    validate
};
