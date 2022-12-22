import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootStoreType} from "./state/store";
import {addNewTodoAC, TodoType} from "./state/todoReducer";
import {InputItemForm} from "./components/InputItemForm";


function App() {

    console.log('App rendering')
    const todolist = useSelector<RootStoreType, TodoType[]>(state => state.todolist)
    const dispatch = useDispatch()

    const addNewTodo = useCallback((value: string) => {
        dispatch(addNewTodoAC(value))
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
