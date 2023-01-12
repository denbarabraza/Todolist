import {useSelector} from "react-redux";
import {RootDispatch, RootStoreType} from "./state/store";
import {
    addTaskAC,
    changeFilterValueAC,
    createTasksTC,
    FilterValueType,
    setTasksTC,
    TaskCommonType
} from "./state/taskReducer";
import React, {FC, memo, useCallback, useEffect} from "react";
import {Button} from "./components/Button";
import {deleteTodoTC, setTodosTC, updateTodoTC} from "./state/todoReducer";
import {InputItemForm} from "./components/InputItemForm";
import {SuperEditbleSpan} from "./components/SuperEditbleSpan";
import {Task} from "./components/Task";
import {TaskStatuses} from "./API/api";

type TodolistPropsType = {
    todoID: string
    title: string
}

export const Todolist: FC<TodolistPropsType> = memo((
    {
        todoID,
        title
    }) => {

    console.log('TODO rendering')

    const task = useSelector<RootStoreType, TaskCommonType>(state => state.task)
    const dispatch = RootDispatch()

    useEffect(()=>{
        dispatch(setTasksTC(todoID))
    },[])

    const onClickSuperButtonHandler = useCallback((filter: FilterValueType) => {
        dispatch(changeFilterValueAC(todoID, filter))
    },[todoID])
    const onClickRemoveTodo = useCallback(() => {
        dispatch(deleteTodoTC(todoID))
    },[todoID])
    const addTaskHandler = useCallback((value: string) => {
        dispatch(createTasksTC(todoID, value))
    },[todoID])

    const setUpTodoTitle=useCallback((upValue:string)=>{
        dispatch(updateTodoTC(todoID,upValue ))
    },[])

    let filteredTask = task[todoID].data
    if (task[todoID].filter === 'Active') {
        filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.New)
    }
    if (task[todoID].filter === 'Completed') {
        filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <SuperEditbleSpan title={title} callback={setUpTodoTitle}/>
                <Button
                    title={'X'}
                    callback={onClickRemoveTodo}
                />
            </h3>

            <InputItemForm callback={addTaskHandler}/>

            <ul>
                {filteredTask.map(t => <Task key={t.id} task={t} todoID={todoID}/>)}
            </ul>
            <Button
                title={'All'}
                callback={() => onClickSuperButtonHandler('All')}
                filter={task[todoID].filter}
            />
            <Button
                title={'Completed'}
                callback={() => onClickSuperButtonHandler('Completed')}
                filter={task[todoID].filter}
            />
            <Button
                title={'Active'}
                callback={() => onClickSuperButtonHandler('Active')}
                filter={task[todoID].filter}
            />

        </div>
    )
})

