import {combineReducers, legacy_createStore} from "redux";
import {todoReducer} from "./todoReducer";
import {tasksReducer} from "./taskReducer";

const rootReducer=combineReducers({
    todolist:todoReducer,
    tasks:tasksReducer,
} as const)

export const store=legacy_createStore(rootReducer)
export type RootStateType=ReturnType<typeof rootReducer>