import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "HTML", isDone: true },
        { id: 5, title: "JS", isDone: false },
        { id: 6, title: "CSS", isDone: true },
    ])

    const removeTask=(id:number)=>{
         setTasks(tasks.filter((el)=>el.id!==id))
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
