import React, {useCallback, useEffect} from 'react';
import './App.module.css';
import {RootDispatch, useAppSelector} from "../../state/store";
import {createTodoTC, setTodosTC} from "../../state/todoReducer";
import {InputItemForm} from "../common/InputItemForm";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {TodolistItem} from "../Todos/TodolistItem";
import AppBarItem from "./AppBarItem";
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from "../../state/appReducer";
import {ErrorSnackbar} from "../common/ErrorSnackbar";

function App() {
    console.log('App rendering')
    let status = useAppSelector<RequestStatusType>(state => state.app.statusApp)
    const dispatch = RootDispatch()

    useEffect(() => {
        dispatch(setTodosTC())
    }, [])

    const addNewTodo = useCallback((value: string) => {
        dispatch(createTodoTC(value))
    }, [])

    return (
        <div>
            <AppBarItem/>
            {status === 'loading' && <LinearProgress/>}
            <Container maxWidth={'xl'}>
                <Grid container style={{padding: '20px'}}>
                    <InputItemForm callback={addNewTodo}/>
                </Grid>
                <TodolistItem/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;