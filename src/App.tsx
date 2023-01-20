import React, {useCallback, useEffect} from 'react';
import './App.module.css';
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {RootDispatch, RootStoreType} from "./state/store";
import {createTodoTC, setTodosTC} from "./state/todoReducer";
import {InputItemForm} from "./components/InputItemForm";
import {TodoType} from "./API/api";
import s from '../src/App.module.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Menu} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

function App() {
    console.log('App rendering')
    const todolist = useSelector<RootStoreType, TodoType[]>(state => state.todolist)
    const dispatch = RootDispatch()
    console.log(todolist)

    useEffect(() => {
        dispatch(setTodosTC())
    }, [])

    const addNewTodo = useCallback((value: string) => {
        dispatch(createTodoTC(value))
    }, [])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth={'xl'}>
                <Grid container style={{padding: '20px'}}>
                    <InputItemForm callback={addNewTodo}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolist.map(t => {
                            return <Grid item key={t.id}>
                                <Paper style={{padding: '10px'}} elevation={3}>
                                    <Todolist
                                        todoID={t.id}
                                        title={t.title}
                                    />
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;