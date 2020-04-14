import React, {useEffect, useState} from "react";
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel,
    Select,
    Tab,
    Tabs,
    TextField
} from "@material-ui/core";
import * as styles from "./task-creation-form.scss";

import Draggable from "react-draggable";
import {TaskModel} from "../../models/task.model";
import {useTabs} from "../../hooks/useTabs";
import {ICreateTaskRequest, ICreateTaskResponse, IUpdateTaskRequest} from "../../contracts/tasks/tasks-contract";
import {dateTimeUtils} from "../../utils/date-time.utils";
import {StdDatePicker} from "../../components/std-inputs/std-date-input/std-date-input";
import {StdTimePicker} from "../../components/std-inputs/std-time-input/std-time-input";
import moment from "moment";
import {ResponseStatus} from "../../contracts/response-status";
import {StdProcessing} from "../../components/std-processing/std-processing";
import {useProcessing} from "../../hooks/useProcessing";
import {IBaseResponse} from "../../contracts/base-response";
import {IBaseRequest} from "../../contracts/base-request";
import {TaskService} from "../../services/task.service";
import {TaskRequestFactory} from "../../factories/task-request-factory";
import {taskCreationLogic} from "./task-creation-form.logic";
import {useDialog} from "../../hooks/useDualog";
import {StdDialog} from "../../components/std-dialog/std-dialog";
import {TaskType} from "../../data/enum/task-type";
import {TaskDirectionType} from "../../data/enum/task-direction-type";
import {TaskFactory} from "../../factories/task-factory";
import {TaskStatus} from "../../data/enum/task-status";

interface ICreateTaskFormProps {
    initialTask?: TaskModel,
    date?: moment.Moment,
    close: () => void,
    isOpen: boolean
}

export function TaskCreationForm(props: ICreateTaskFormProps) {
    const tabsHook = useTabs(0);
    const processingHook = useProcessing();

    const [date, setDate] = useState(dateTimeUtils.mergeTime(props.date, moment()) || moment());

    const {isOpen: confirmDialogOpen, close: closeConfirmDialog, open: openConfirmDialog} = useDialog(false);

    const [unexpectedTask, setUnexpectedTask] = useState<NonNullable<TaskModel>>((props.initialTask || TaskFactory.CreateTaskModel({
        comment: "",
        direction: null,
        planStartUtc: dateTimeUtils.dateTimeToUnix(date.clone()),
        planEndUtc: dateTimeUtils.dateTimeToUnix(date.clone().add(30, "minutes")),
        status: TaskStatus.New,
        type: TaskType.Unexpected

    })));
    const [planTask, setPlanTask] = useState<NonNullable<TaskModel>>((props.initialTask || TaskFactory.CreateTaskModel({
        comment: "",
        direction: null,
        planStartUtc: dateTimeUtils.dateTimeToUnix(date.clone()),
        planEndUtc: dateTimeUtils.dateTimeToUnix(date.clone().add(30, "minutes")),
        status: TaskStatus.New,
        type: TaskType.Plan
    })));

    useEffect(() => {
        if(props.initialTask) {
            console.log("initialTask", props.initialTask.planStart.format("HH:mm:ss"));
            setDate(props.initialTask.planStart);
        }
    }, []);

    const saveTask = async (task: TaskModel): Promise<ICreateTaskResponse> => {
        const request = TaskRequestFactory.GetCreateTaskRequest(task);
        return await TaskService.CreateTask(request as ICreateTaskRequest);
    };

    const submitForm = (taskType: TaskType) => async () => {
        let request: IBaseRequest;
        let response: IBaseResponse;

        let task = taskType == TaskType.Unexpected
            ? unexpectedTask
            : planTask;

        task.type = taskType;
        task.planStart = dateTimeUtils.mergeTime(date, task.planStart);
        task.planEnd = dateTimeUtils.mergeTime(date, task.planEnd);
        const validateResult = taskCreationLogic.validate(task);

        if(!validateResult.isValid) {
            processingHook.setErrors(validateResult.errors);
            return;
        }

        if(!props.initialTask) {
            const checkIntersectRequest = TaskRequestFactory.GetCheckTaskIntersectRequest(task.loaderId, task.planStart, task.planEnd, taskType);
            const checkTaskIntersectResponse = await TaskService.CheckTaskIntersect(checkIntersectRequest);
            if(checkTaskIntersectResponse.taskIntersected) {
                openConfirmDialog();
            } else {
                processingHook.setProgress();
                response = await saveTask(task);
            }
        } else {
            request = TaskRequestFactory.GetUpdateTaskRequest(task);
            processingHook.setProgress();
            response = await TaskService.UpdateTask(request as IUpdateTaskRequest);

        }

        if(response) {
            response.status == ResponseStatus.Success
                ? props.close()
                : processingHook.setErrors([response.message]);
        }
    };

    return<React.Fragment>
        <Draggable
            handle="#dragId"
        >
            <Dialog
                hideBackdrop={true}
                open={props.isOpen}
                onClose={props.close}
            >
                <AppBar id="dragId" position="static" style={{width: 300}}>
                    <Tabs
                        value={tabsHook.currentTabIndex}
                        onChange={(ev, value) => tabsHook.setCurrentTabIndex(value)}
                        centered={true}
                        variant="fullWidth"
                    >
                        <Tab label="План" value={0}/>
                        <Tab label="ФМ" value={1}/>
                    </Tabs>
                </AppBar>
                {(tabsHook.currentTabIndex == 0) && <form>
                    <DialogContent className={styles.formContent}>
                        <StdDatePicker
                            onChange={(value) => {
                                setDate(value);
                                setPlanTask(prevValue => ({
                                    ...prevValue,
                                    planStart: dateTimeUtils.mergeTime(value, prevValue.planStart),
                                    planEnd: dateTimeUtils.mergeTime(value, prevValue.planEnd),
                                }));
                            }}
                            value={date}
                            label="Дата"
                        />
                        <FormControl>
                            <InputLabel htmlFor="direction">Направление</InputLabel>
                            <Select
                                native
                                value={planTask.direction || "-1"}
                                onChange={ev => setPlanTask(prevValue => ({
                                    ...prevValue,
                                    direction: parseInt((ev.currentTarget.value as any))
                                }))}
                                inputProps={{
                                    name: 'direction',
                                    id: 'direction',
                                }}
                            >
                                <option value="-1"/>
                                <option value={TaskDirectionType.Metal}>Метал</option>
                                <option value={TaskDirectionType.Pvh}>ПВХ</option>
                                <option value={TaskDirectionType.Mebel}>Мебель</option>
                                <option value={TaskDirectionType.Furnitura}>Фурнитура</option>
                                <option value={TaskDirectionType.Extruzia}>Экструзия</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="loader">Погрузчик</InputLabel>
                            <Select
                                native
                                value={planTask.loaderId || "-1"}
                                onChange={ev => setPlanTask(prevValue => ({
                                    ...prevValue,
                                    loaderId: parseInt((ev.currentTarget.value as any) || "-1")
                                }))}
                                inputProps={{
                                    name: 'loader',
                                    id: 'loader',
                                }}
                            >
                                <option value="-1"/>
                                <option value={1}>Погрузчик 1</option>
                                <option value={2}>Погрузчик 2</option>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Комментарий"
                            defaultValue={planTask.comment}
                            onBlur={ev => setPlanTask(prevValue => ({
                                ...prevValue,
                                comment: ev.currentTarget.value
                            }))}
                            multiline={true}
                            rows={2}
                            rowsMax={4}
                        />
                        <StdTimePicker
                            value={planTask.planStart}
                            onChange={value => setPlanTask(prevValue => ({
                                ...prevValue,
                                planStart: value
                            }))}
                            label="Начало"
                        />
                        <StdTimePicker
                            value={planTask.planEnd}
                            onChange={value => setPlanTask(prevValue => ({
                                ...prevValue,
                                planEnd: value
                            }))}
                            label="Конец"
                        />
                    </DialogContent>
                    <StdProcessing processingStatus={processingHook.processingStatus} successMessage="success" errorMessages={processingHook.statusMessages}/>
                    <DialogActions className={styles.dialogActions}>
                        <Button variant="contained" color="primary" onClick={submitForm(TaskType.Plan)}>Сохранить</Button>
                        <Button variant="contained" onClick={props.close}>Отмена</Button>
                    </DialogActions>
                </form>}
                {(tabsHook.currentTabIndex == 1) && <form>
                    <DialogContent className={styles.formContent}>
                        <StdDatePicker
                            onChange={(value) =>
                                setUnexpectedTask(prevValue => ({
                                    ...prevValue,
                                    planStart: dateTimeUtils.mergeTime(value, prevValue.planStart),
                                    planEnd: dateTimeUtils.mergeTime(value, prevValue.planEnd),
                                }))
                            }
                            value={unexpectedTask.planStart}
                            label="Дата"
                        />
                        <FormControl>
                            <InputLabel htmlFor="direction">Направление</InputLabel>
                            <Select
                                native
                                value={unexpectedTask.direction || "-1"}
                                onChange={ev => setUnexpectedTask(prevValue => ({
                                    ...prevValue,
                                    direction: parseInt((ev.currentTarget.value as any))
                                }))}
                                inputProps={{
                                    name: 'direction',
                                    id: 'direction',
                                }}
                            >
                                <option value="-1"/>
                                <option value={TaskDirectionType.Metal}>Метал</option>
                                <option value={TaskDirectionType.Pvh}>ПВХ</option>
                                <option value={TaskDirectionType.Mebel}>Мебель</option>
                                <option value={TaskDirectionType.Furnitura}>Фурнитура</option>
                                <option value={TaskDirectionType.Extruzia}>Экструзия</option>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Причина"
                            defaultValue={unexpectedTask.comment}
                            onBlur={ev => setUnexpectedTask(prevValue => ({
                                ...prevValue,
                                comment: ev.currentTarget.value
                            }))}
                            multiline={true}
                            rows={2}
                            rowsMax={4}
                        />
                        <StdTimePicker
                            value={unexpectedTask.planStart}
                            onChange={value => setUnexpectedTask(prevValue => ({
                                ...prevValue,
                                planStart: value
                            }))}
                            label="Начало"
                        />
                    </DialogContent>
                    <StdProcessing processingStatus={processingHook.processingStatus} successMessage="success" errorMessages={processingHook.statusMessages}/>
                    <DialogActions className={styles.dialogActions}>
                        <Button variant="contained" color="primary" onClick={submitForm(TaskType.Unexpected)}>Сохранить</Button>
                        <Button variant="contained" onClick={props.close}>Отмена</Button>
                    </DialogActions>
                </form>}
            </Dialog>
        </Draggable>
        <StdDialog
            message="Задание для данного погрузчика на это время уже существует. Все равно создать задание?"
            close={closeConfirmDialog}
            isOpen={confirmDialogOpen}
            onOk={async () => {
                const response = await saveTask(planTask);

                if(response.status != ResponseStatus.Success) {
                    processingHook.setErrors([response.message]);
                } else {
                    props.close();
                }
            }}
        />
    </React.Fragment>
}
