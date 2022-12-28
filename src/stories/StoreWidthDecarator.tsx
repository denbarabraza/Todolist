import {v1} from "uuid";
import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "../state/taskReducer";
import {RootStoreType} from "../state/store";
import {todolistId1, todolistId2, todoReducer} from "../state/todoReducer";
import {Provider} from "react-redux";


const rootReducer=combineReducers({
    task: taskReducer,
    todolist:todoReducer
})

const initialGlobalState = {
    'task':{
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false}
            ],
            filter: "All"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Salt", isDone: true}
            ],
            filter: "All"
        }
    },
    'todolist':[
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ]
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootStoreType);


export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
