import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todoReducer} from "./todoReducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    task: taskReducer,
    todolist: todoReducer
})

export type RootStoreType = ReturnType<typeof rootReducer>
export type RootDispatchThunkType = ThunkDispatch<RootStoreType, any, AnyAction>
export const RootDispatch = () => useDispatch<RootDispatchThunkType>()

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))