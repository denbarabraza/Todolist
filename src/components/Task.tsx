import React, {memo, useCallback} from "react";
import {InDataTaskType, onChangeTaskStatusAC, removeTaskAC, setUpTasksTitleAC} from "../state/taskReducer";
import {Button} from "./Button";
import {SuperEditbleSpan} from "./SuperEditbleSpan";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    task: InDataTaskType
    todoID:string
}
export const Task: React.FC<TaskPropsType> = memo((
    {
        task,
        todoID
    }) => {

    const dispatch=useDispatch()

    const onClickRemoveTask = useCallback(() => {
        dispatch(removeTaskAC(todoID, task.id))
    }, [todoID,task])
    const onChangeTaskStatus = useCallback((isDone: boolean, taskID: string) => {
        dispatch(onChangeTaskStatusAC(todoID, task.id, isDone))
    }, [todoID,task])
    const setUpTasksTitle = useCallback((upValue: string) => {
        dispatch(setUpTasksTitleAC(todoID, task.id, upValue))
    }, [todoID,task])

    return (
        <li key={task.id}>
            <Button
                title={'X'}
                callback={onClickRemoveTask}
            />
            <input
                type={"checkbox"}
                checked={task.isDone}
                onChange={(e) => onChangeTaskStatus(e.currentTarget.checked, task.id)}
            />
            <SuperEditbleSpan
                title={task.title}
                callback={(upValue) => setUpTasksTitle(upValue)}/>
            <span>{}</span>
        </li>
    )
})