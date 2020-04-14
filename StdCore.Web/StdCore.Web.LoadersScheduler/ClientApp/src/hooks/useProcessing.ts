import {ProcessingStatus} from "../enum/processing-type";
import {useEffect, useRef, useState} from "react";
import {guid} from "../utils/guid.util";

interface ITask {
    token: string,
    status: ProcessingStatus,
    statusMessages: Array<string>
}

export const ProcessingNames = {
    [ProcessingStatus.Timeout]: "Timeout",
    [ProcessingStatus.None]: "None",
    [ProcessingStatus.Error]: "Error",
    [ProcessingStatus.Complete]: "Complete",
    [ProcessingStatus.Progress]: "Progress",
};

export function useProcessing(progressTimeout: number = 5000, errorAndCompleteDuration: number = 5000) {
    const timeouts = useRef<NodeJS.Timeout[]>([]);

    const [currentTask, setCurrentTask] = useState<ITask>({
        status: ProcessingStatus.None,
        token: "initial",
        statusMessages: []
    });
    const updateStatus = (token: string, status: ProcessingStatus) => (currentTask: ITask): ITask => {
        // Если обновляется текущая задача
        if(token === currentTask.token) {
            // И если статус задачи запущена или нужно закончить задачу, то обновляем ее статус
            if(status === ProcessingStatus.None || currentTask.status === ProcessingStatus.Progress) {
                return {
                    ...currentTask,
                    status: status
                }
            }
        }

        return currentTask;
    };

    const setCurrentTaskWithDelay = (token: string, status: ProcessingStatus, delay) => {
        let timeout = setTimeout(() => setCurrentTask(updateStatus(token, status)), progressTimeout);
        timeouts.current.push(timeout as any);
    };

    useEffect(() => {
        return () => {
            if(timeouts) {
                timeouts.current.forEach(t => t && clearTimeout(t));
            }
        }
    }, []);


    return {
        processingStatus: currentTask.status,
        statusMessages: currentTask.statusMessages,
        setProgress: () =>{
            let token = guid();
            setCurrentTask({
                token,
                status: ProcessingStatus.Progress,
                statusMessages: []
            });
            setCurrentTaskWithDelay(token, ProcessingStatus.Timeout, progressTimeout);
        },
        setComplete: (msg: string = null) => {
            setCurrentTask(t => {
                setCurrentTaskWithDelay(t.token, ProcessingStatus.None, errorAndCompleteDuration);
                return {
                    ...t,
                    statusMessage: msg,
                    status: ProcessingStatus.Complete
                }
            });
        },
        setErrors: (msgs: Array<string> = null) => {
            setCurrentTask(t => {
                return {
                    ...t,
                    statusMessages: msgs,
                    status: ProcessingStatus.Error
                }
            });
        },
        error: () => currentTask.status == ProcessingStatus.Error,
        complete: () => currentTask.status === ProcessingStatus.Complete || currentTask.status === ProcessingStatus.None,
        progress: () => currentTask.status === ProcessingStatus.Progress
    }
}
