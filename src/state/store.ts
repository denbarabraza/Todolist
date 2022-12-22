import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todoReducer} from "./todoReducer";


const rootReducer=combineReducers({
    task: taskReducer,
    todolist:todoReducer
})

export type RootStoreType= ReturnType<typeof rootReducer>

export const store=legacy_createStore(rootReducer)