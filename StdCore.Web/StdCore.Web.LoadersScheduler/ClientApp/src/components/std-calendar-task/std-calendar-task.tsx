import React, {CSSProperties, Dispatch, useMemo, useState} from "react";
import * as styles from "./std-calendar-task.scss"
import {TaskModel} from "../../models/task.model";
import {TaskUtil} from "../../utils/task-util";
import {useDispatch, useSelector} from "react-redux";
import {selectCalendarSettings} from "../../redux/selectors/calendar-settings.selectors";
import {Button, Menu, MenuItem, Tooltip} from "@material-ui/core";
import {changeTaskStatus, deleteTask} from "../../redux/actions/task.actions";
import {SetDialog} from "../../redux/actions/dialog.actions";
import {DialogType} from "../../enum/DialogType";
import {useParams} from "react-router";
import {IRouteParams} from "../../route-params";
import {TaskType} from "../../data/enum/task-type";
import {TaskStatus} from "../../data/enum/task-status";

export interface IStdCalendarTaskProps {
    task: TaskModel,
    isFact: boolean
}

export function StdCalendarTask(props: IStdCalendarTaskProps) {
    const {loaderId} = useParams<IRouteParams>();
    const dispatch = useDispatch();
    const {task} = props;
    const {minuteHeight, startOfScaleTime} = useSelector(selectCalendarSettings);

    const [menuId] = useState("task-menu" + task.id);
    const [anchorEl, setAnchorEl] = useState<Element>(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const style: CSSProperties = useMemo(() => ({
        top: props.isFact
            ? TaskUtil.getFactTopOffset(task, minuteHeight, startOfScaleTime)
            : TaskUtil.getPlanTopOffset(task, minuteHeight, startOfScaleTime),
        height: props.isFact
            ? TaskUtil.getFactHeight(task, minuteHeight)
            : TaskUtil.getPlanHeight(task, minuteHeight),
        backgroundColor: TaskUtil.getColor(task)
    }), [task.planStart, task.planEnd]);

    if(props.isFact && !task.factStart)
        return null;

    // Не показываем план для баков, логистов и ФМ
    if(!props.isFact && (task.planStart.year() == 1970 || (task.type == TaskType.Unexpected && task.loaderId)))
        return null;

    return <div className={styles.taskContainer} style={style}>
        <span className={styles.taskStatus}>
            {TaskUtil.getStatusString(task)}
        </span>
        <Tooltip title={TaskUtil.getFullInfo(task)} placement="top-start">
            <div className={styles.shortInfo}>{TaskUtil.getShortInfo(task)}</div>
        </Tooltip>
        <Button
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleClick}
            className={styles.contextMenuButton}
            classes={{
                label: styles.buttonLabel
            }}
        >
            <span className={styles.contextMenuButtonSpan}/>
            <span className={styles.contextMenuButtonSpan}/>
            <span className={styles.contextMenuButtonSpan}/>
        </Button>
        <ContextMenu
            dispatch={dispatch}
            anchorEl={anchorEl}
            menuId={menuId}
            onClose={handleClose}
            task={task}
            loaderId={loaderId}
        />
    </div>
}

interface IContextMenuProps {
    menuId: string,
    anchorEl: Element,
    onClose: () => void,
    dispatch: Dispatch<any>,
    task: TaskModel,
    loaderId: string
}

function ContextMenu(props: IContextMenuProps) {
    const {menuId, anchorEl, onClose: handleClose, dispatch, task, loaderId} = props;
    return <Menu
        id={menuId}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
    >
        <MenuItem onClick={() =>{
            handleClose();
            dispatch(deleteTask(task.id));
        }}>
            Удалить
        </MenuItem>
        <MenuItem onClick={() => {
            handleClose();
            dispatch(SetDialog(DialogType.TaskCreation, task));
        }}>
            Редактировать
        </MenuItem>
        {
            task.type == TaskType.Unexpected && task.status == TaskStatus.New && loaderId &&
            <MenuItem onClick={() => {
                handleClose();
                dispatch(changeTaskStatus(task.id, TaskStatus.InProcess, parseInt(loaderId)));
            }}>
                Взять в работу
            </MenuItem>
        }
        {
            task.type == TaskType.Unexpected && task.status == TaskStatus.InProcess && loaderId &&
            <MenuItem onClick={() => {
                handleClose();
                dispatch(changeTaskStatus(task.id, TaskStatus.Completed, parseInt(loaderId)));
            }}>
                Завершить
            </MenuItem>
        }
    </Menu>
}
