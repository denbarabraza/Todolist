import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {RootStoreType} from "../../state/store";
import {TodoType} from "../../API/api";

export const TodolistItem = () => {
    const todolist = useSelector<RootStoreType, TodoType[]>(state => state.todolist)
    return (
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
    );
};

