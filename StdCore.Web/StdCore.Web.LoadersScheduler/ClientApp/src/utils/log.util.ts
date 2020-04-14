import {DevelopSettings} from "../settings/develop.settings";

export class LogUtil {
    public static Log(key: string, msg?: any) {
        if(DevelopSettings.needLogs)
            console.log(key + ": ", msg);
    }

    public static ColorLog(key: string, msg?: any, color: string = "blue") {
        if(DevelopSettings.needLogs)
            console.log(`%c ${key} : ${msg ?? ""}`, `background: white; color: ${color}`);
    }

    public static LogError(key: string, msg?: any) {
        if(DevelopSettings.needLogs)
            console.error(key + ": ", msg);
    }
}
