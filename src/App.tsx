import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootStoreType} from "./state/store";
import {addNewTodoAC, createTodoTC, setTodosTC} from "./state/todoReducer";
import {InputItemForm} from "./components/InputItemForm";
import {TodoType} from "./API/api";

function App() {
    console.log('App rendering')
    const todolist = useSelector<RootStoreType, TodoType[]>(state => state.todolist)
    const dispatch = RootDispatch()
    console.log(todolist)

    useEffect(()=>{
        dispatch(setTodosTC())
    },[])

    const addNewTodo = useCallback((value: string) => {
        dispatch(createTodoTC(value))
    }, [])

    return (
        <div className="App">
            <InputItemForm callback={addNewTodo}/>
            {todolist.map(t => {
                    return (
                        <div key={t.id}>
                            <Todolist
                                todoID={t.id}
                                title={t.title}
                            />
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default App;
