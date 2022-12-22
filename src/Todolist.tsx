import {useDispatch, useSelector} from "react-redux";
import {RootStoreType} from "./state/store";
import {addTaskAC, changeFilterValueAC, FilterValueType, TaskType} from "./state/taskReducer";
import React, {FC, memo, useCallback} from "react";
import {Button} from "./components/Button";
import {removeTodoAC, setUpTodoTitleAC} from "./state/todoReducer";
import {InputItemForm} from "./components/InputItemForm";
import {SuperEditbleSpan} from "./components/SuperEditbleSpan";
import {Task} from "./components/Task";

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

    const task = useSelector<RootStoreType, TaskType>(state => state.task)
    const dispatch = useDispatch()


    const onClickSuperButtonHandler = useCallback((filter: FilterValueType) => {
        dispatch(changeFilterValueAC(todoID, filter))
    },[todoID])
    const onClickRemoveTodo = useCallback(() => {
        dispatch(removeTodoAC(todoID))
    },[todoID])
    const addTaskHandler = useCallback((value: string) => {
        dispatch(addTaskAC(todoID, value))
    },[todoID])

    const setUpTodoTitle=useCallback((upValue:string)=>{
        dispatch(setUpTodoTitleAC(todoID,upValue ))
    },[])

    let filteredTask = task[todoID].data
    if (task[todoID].filter === 'Active') {
        filteredTask = task[todoID].data.filter(e => !e.isDone)
    }
    if (task[todoID].filter === 'Completed') {
        filteredTask = task[todoID].data.filter(e => e.isDone)
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

