import React from "react";
import {StdHeader} from "../../components/std-header/std-header";
import {StdCalendar} from "../../components/std-calendar/std-calendar";
import {useDispatch, useSelector} from "react-redux";
import {TaskCreationForm} from "../../forms/task-creation-form/task-creation-form";
import {selectIsAuthorized} from "../../redux/selectors/authorize.selectors";
import {useFormDialog} from "../../hooks/useFormDialog";
import {DialogType} from "../../enum/DialogType";
import {selectSelectedDate} from "../../redux/selectors/global.selectors";
import {Button} from "@material-ui/core";
import {SetDialog} from "../../redux/actions/dialog.actions";
import {StdDateSlider} from "../../components/std-date-slider/std-date-slider";
import {setSelectedDate} from "../../redux/actions/global.actions";
import moment from "moment";
import {StdStartStopButtons} from "../../components/std-start-stop-buttons/std-start-stop-buttons";
import * as styles from "./calendar.page.scss";
import {useParams} from "react-router";
import {IRouteParams} from "../../route-params";
import {changeTaskStatus, completeTaskInProcess, createTask} from "../../redux/actions/task.actions";
import {TaskFactory} from "../../factories/task-factory";
import {TaskType} from "../../data/enum/task-type";
import {TaskStatus} from "../../data/enum/task-status";
import {TaskDirectionType} from "../../data/enum/task-direction-type";

export function CalendarPage() {
    const dispatch = useDispatch();
    const dialogHook = useFormDialog(DialogType.TaskCreation);
    const selectedDate = useSelector(selectSelectedDate);
    const isAuthorized = useSelector(selectIsAuthorized);
    const openTaskCreationDialog = () => dispatch(SetDialog(DialogType.TaskCreation, null));
    const {loaderId} = useParams<IRouteParams>();
    const isPersonal = !!loaderId;
    const setDate = (val) => {
        dispatch(setSelectedDate(val));
    };

    const nextDate = () => {
        dispatch(setSelectedDate(selectedDate.clone().add(1, "day")));
    };
    const prevDay = () => {
        dispatch(setSelectedDate(selectedDate.clone().add(-1, "day")));
    };
    const setToday = () => {
        dispatch(setSelectedDate(moment()));
    };

    const startTask = (direction: TaskDirectionType) => {
        const task = TaskFactory.CreateTaskModel({
            comment: "",
            direction: direction,
            planStartUtc: 0,
            planEndUtc: 0,
            loaderId: parseInt(loaderId),
            status: TaskStatus.InProcess,
            type: TaskType.Unexpected
        });
        dispatch(createTask(task));
    };

    const stopTask = () => {
        dispatch(completeTaskInProcess(parseInt(loaderId)));
    };

    if(!isAuthorized)
        return null;

    return <div className={styles.calendarPage}>
        <StdHeader>
            <div className={styles.headerInterface}>
                <StdDateSlider
                    selectedDate={selectedDate}
                    setDate={setDate}
                    nextDate={nextDate}
                    prevDay={prevDay}
                    setToday={setToday}
                />
                <Button
                    variant="outlined"
                    color="default"
                    onClick={openTaskCreationDialog}
                    size="small"
                    className={styles.todayButton}
                >
                    Создать
                </Button>
                {
                    isPersonal &&
                    <React.Fragment>
                        <StdStartStopButtons legendText="Логисты:" onStart={() => startTask(TaskDirectionType.Logistic)} onStop={stopTask}/>
                        <StdStartStopButtons legendText="Баки:" onStart={() => startTask(TaskDirectionType.Baki)} onStop={stopTask}/>
                    </React.Fragment>
                }

            </div>
        </StdHeader>
        <StdCalendar loaderId={parseInt(loaderId)}/>
        {
            dialogHook.isOpen &&
            <TaskCreationForm
                close={dialogHook.close}
                isOpen={dialogHook.isOpen}
                initialTask={dialogHook.dialogData}
                date={selectedDate}
            />
        }
    </div>
}
