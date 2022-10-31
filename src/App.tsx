import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

export type FilteredType='All'|'Active'|'Completed'

function App() {

    const [tasks, setTask]=useState([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "HTML", isDone: true}
    ])
    const [filter, setFilter]=useState<FilteredType>('All')

    //Удаление таски
    const removeTask=(id:string)=>{
        let afterRemTask = tasks.filter(el=>el.id!==id)
        setTask(afterRemTask)
    }

    //Фильтр таски
    const filteredTask=(v:FilteredType)=>{
        setFilter(v)
    }
    let afterFilter = tasks
    if(filter==='Active'){
        afterFilter=tasks.filter((el)=>!el.isDone)
    }
    if(filter==='Completed'){
        afterFilter=tasks.filter((el)=>el.isDone)
    }

    //Добавление таски
    const addTasks=(title:string)=>{
        let newTask={
            id: v1(),
            title: title,
            isDone: true
        }
        setTask([newTask,...tasks])
    }

    //Изменение значения checked
    const changeTaskStatus=(taskID: string, isDone: boolean)=>{
        setTask(tasks.map(e=>e.id===taskID ? {...e, isDone: isDone}: e))
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn??"}
                tasks={afterFilter}
                removeTask={removeTask}
                filteredTask={filteredTask}
                addTasks={addTasks}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
