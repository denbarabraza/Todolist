import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputItem} from "./components/InputItem";
import {
    addTaskAC,
    addTodoAC,
    changeStatusAC,
    removeTaskAC,
    taskReducer,
    updateTitleTaskAC
} from "./reducer/taskReducer";
import {addNewTodoAC, changeFilterAC, removeTodolistAC, todoReducer, updateTitleTodoAC} from "./reducer/todoReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    //useState
    /* let [todolists, setTodolists] = useState<Array<TodolistType>>([
         {id: todolistId1, title: "What to learn", filter: "all"},
         {id: todolistId2, title: "What to buy", filter: "all"}
     ])

     let [tasks, setTasks] = useState<TasksStateType>({
         [todolistId1]: [
             {id: v1(), title: "HTML&CSS", isDone: true},
             {id: v1(), title: "JS", isDone: true}
         ],
         [todolistId2]: [
             {id: v1(), title: "Milk", isDone: true},
             {id: v1(), title: "React Book", isDone: true}
         ]
     });*/

    //useReducer
    let [todolists, dispatchTodo] = useReducer(todoReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
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

    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(changeStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodo(changeFilterAC(value, todolistId))
    }

    function removeTodolist(todoID: string) {
        dispatchTodo(removeTodolistAC(todoID))
    }

    const addNewTodo = (title: string) => {
        let newTodoId=v1();
        dispatchTasks(addTodoAC(newTodoId))
        dispatchTodo(addNewTodoAC(title, newTodoId))
    }
    const updateTitleTask = (todolistId: string, taskID: string, uptitle: string) => {
        dispatchTasks(updateTitleTaskAC(todolistId, taskID, uptitle))
    }
    const updateTitleTodo = (todolistId: string, uptitle: string) => {
        dispatchTodo(updateTitleTodoAC(todolistId,uptitle))
    }

    return (
        <div className="App">
            <InputItem callback={(title) => {
                addNewTodo(title)
            }}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTitleTask={updateTitleTask}
                        updateTitleTodo={updateTitleTodo}
                    />
                })
            }

        </div>
    );
}

export default App;
