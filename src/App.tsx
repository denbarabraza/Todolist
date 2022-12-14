import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {addNewTodoAC, TodoType} from "./state/todoReducer";
import {SuperInput} from "./components/SuperInput";


function App() {
    //Redux
    const dispatch=useDispatch()
    const todolist=useSelector<RootStateType,TodoType[]>(state => state.todolist)
    //Function
    const addNewTodo=(value:string)=>{
        dispatch(addNewTodoAC(value))
    }

    return (
        <div className="App">
            <SuperInput callback={addNewTodo}/>
            {todolist.map(t=>{
                    return(
                        <div key={t.id}>
                            <Todolist
                                todoID={t.id}
                                title={t.title}
                                filter={t.filter}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default App;
