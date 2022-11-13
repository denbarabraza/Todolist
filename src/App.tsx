import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import {AddTodoItem} from "./AddTodoItem";

export type FilteredType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilteredType
};

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'Active'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    //Удаление таски
    const removeTask = (todolistsID: string, taskID: string) => {
        setTasks({...tasks, [todolistsID]: tasks[todolistsID].filter(el => el.id !== taskID)})
    }

    //Фильтр таски
    const filteredTask = (todolistsID: string, v: FilteredType) => {
        setTodolists(todolists.map((el) => el.id === todolistsID ? {...el, filter: v} : el))
    }

    //Добавление таски
    const addTasks = (todolistsID: string, title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: true
        }
        setTasks({...tasks, [todolistsID]: [newTask, ...tasks[todolistsID]]})
    }

    //Изменение значения checked
    const changeTaskStatus = (todolistsID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistsID]: tasks[todolistsID].map(el => el.id === taskID ? {...el, isDone: isDone} : el)
        })
    }

    // Удаление Todolist
    const removeTodolist = (todolistsID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistsID))
        delete tasks[todolistsID]
    }
    //Добавление Todolist
    const addTodo=(title:string)=>{
        let newTodo:TodolistsType={
            id: v1(),
            title: title,
            filter: 'All'
        }
        setTodolists([newTodo,...todolists])
        setTasks({
            ...tasks,
            [newTodo.id]:[]
        })
    }

    return (
        <div className="App">
        <AddTodoItem addItem={addTodo}/>
            {todolists.map((e) => {

                let afterFilter = tasks[e.id]
                if (e.filter === 'Active') {
                    afterFilter = tasks[e.id].filter((el) => !el.isDone)
                }
                if (e.filter === 'Completed') {
                    afterFilter = tasks[e.id].filter((el) => el.isDone)
                }

                return (
                    <Todolist
                        key={e.id}
                        todolistsID={e.id}
                        title={e.title}
                        tasks={afterFilter}
                        removeTask={removeTask}
                        filteredTask={filteredTask}
                        addTasks={addTasks}
                        changeTaskStatus={changeTaskStatus}
                        filter={e.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
