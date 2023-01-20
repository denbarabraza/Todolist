import React, {memo, useCallback} from "react";
import {removeTasksTC, updateTaskTC} from "../state/taskReducer";
import {Button} from "./Button";
import {SuperEditbleSpan} from "./SuperEditbleSpan";
import {TaskStatuses, TaskType} from "../API/api";
import {RootDispatch} from "../state/store";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

type TaskPropsType = {
    task: TaskType
    todoID:string
}
export const Task: React.FC<TaskPropsType> = memo((
    {
        task,
        todoID
    }) => {

    const dispatch=RootDispatch()

    const onClickRemoveTask = useCallback(() => {
        dispatch(removeTasksTC(todoID, task.id))
    }, [todoID,task])
    const onChangeTaskStatus = useCallback((taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoID, taskID, {status:status}))
    }, [todoID,task])
    const setUpTasksTitle = useCallback((upValue: string) => {
        dispatch(updateTaskTC(todoID, task.id, {title:upValue}))
    }, [todoID,task])

    return (
        <div key={task.id}>
            <input
                type={"checkbox"}
                checked={task.status === TaskStatuses.Completed}
                onChange={(e) => onChangeTaskStatus(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}
            />
            <SuperEditbleSpan
                title={task.title}
                callback={(upValue) => setUpTasksTitle(upValue)}
            />
            <IconButton
                aria-label="delete"
                onClick={onClickRemoveTask}
            >
                <Delete/>
            </IconButton>
        </div>
    )
})