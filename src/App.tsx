import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import {
    addTaskAC,
    addTodoInTaskAC,
    changeCheckedAC,
    removeTaskAC,
    taskReducer,
    updateTitleTaskAC
} from "./state/taskReducer";
import {addTodoAC, filteredTaskAC, removeTodoAC, todoReducer, updateTitleTodoAC} from "./state/todoReducer";
import {InputItem} from "./components/InputItem";

export type FilterType = 'All' | 'Active' | 'Completed'

export const App = () => {

    //State
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, dispatchTodo] = useReducer(todoReducer, [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ])

    let [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    console.log(todolists)
    //Function
    const removeTask = (todoID: string, taskID: string) => {
        dispatchTasks(removeTaskAC(todoID, taskID))
    }
    const changeChecked = (todoID: string, taskID: string, isDone: boolean) => {
        dispatchTasks(changeCheckedAC(todoID, taskID, isDone))
    }
    const filteredTask = (todoID: string, filter: FilterType) => {
        dispatchTodo(filteredTaskAC(todoID, filter))
    }
    const addTask = (todoID: string, title: string) => {
        dispatchTasks(addTaskAC(todoID, title))
    }
    const removeTodo = (todoID: string) => {
        delete tasks[todoID]
        dispatchTodo(removeTodoAC(todoID))
    }
    const addTodoInputItem = (value: string) => {
        let newIDTodo = v1()
        dispatchTodo(addTodoAC(newIDTodo, value))
        dispatchTasks(addTodoInTaskAC(newIDTodo))
    }
     const updateTitleTask = (todoID: string, taskID: string, uptitle: string) => {
        dispatchTasks(updateTitleTaskAC(todoID, taskID, uptitle))
    }

    const updateTodoTitle = (todoID: string, uptitle: string) => {
        dispatchTodo(updateTitleTodoAC(todoID, uptitle))
    }


    return (
        <div className="App">
            <InputItem callback={(value) => addTodoInputItem(value)}/>

            {todolists.map(e => {
                let afterFilter = tasks[e.id]
                if (e.filter === 'Active') {
                    afterFilter = tasks[e.id].filter(e => !e.isDone)
                }
                if (e.filter === 'Completed') {
                    afterFilter = tasks[e.id].filter(e => e.isDone)
                }

                return (
                    <div key={e.id}>
                        <Todolist
                            title={e.title}
                            todoID={e.id}
                            task={afterFilter}
                            removeTask={removeTask}
                            changeChecked={changeChecked}
                            filteredTask={filteredTask}
                            addTask={addTask}
                            removeTodo={removeTodo}
                            filter={e.filter}
                            updateTitleTask={updateTitleTask}
                            updateTodoTitle={updateTodoTitle}
                        />
                    </div>
                )
            })}
        </div>

    )
}

