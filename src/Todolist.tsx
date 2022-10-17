import React, {useState} from 'react';


type TaskType = {
    id: number
    title: string
    isDone: boolean
}

 type FilterValueType = 'All'|'Active'|'Completed'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:number)=>void
}

export function Todolist(props: PropsType) {

    let [filter, setFilteredValue]=useState<FilterValueType>("All")
    let afterFilterTasks=props.tasks
    if(filter==='Active'){
        afterFilterTasks=props.tasks.filter((el)=>!el.isDone)
    }
    if(filter==='Completed'){
        afterFilterTasks=props.tasks.filter((el)=>el.isDone)
    }
    const filteredTask=(filterValue:FilterValueType)=>{
        setFilteredValue(filterValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {afterFilterTasks.map((el)=>{
                return(
                    <li key={el.id}>
                        <button onClick={()=>props.removeTask(el.id)}> X </button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=>{filteredTask('All')}}>All</button>
            <button onClick={()=>{filteredTask('Active')}}>Active</button>
            <button onClick={()=>{filteredTask('Completed')}}>Completed</button>
        </div>
    </div>
}
