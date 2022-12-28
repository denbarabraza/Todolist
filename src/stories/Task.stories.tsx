import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../components/Task";
import {Provider, useDispatch, useSelector} from "react-redux";
import {RootStoreType, store} from "../state/store";
import {InDataTaskType, TaskType} from "../state/taskReducer";
import {ReduxStoreProviderDecorator} from "./StoreWidthDecarator";
import {todolistId2} from "../state/todoReducer";


export default {
    title: 'TODO/Task',
    component: Task,
    decorators: [
        ReduxStoreProviderDecorator
    ]
} as ComponentMeta<typeof Task>;


const TaskWithReduxStory = () => {
    const task = useSelector<RootStoreType, InDataTaskType>(state => state.task[todolistId2].data[0])

    return <Task task={task} todoID={todolistId2}/>
}


const Template: ComponentStory<typeof Task> = (args) => {
    return <TaskWithReduxStory/>
}

export const TaskIsDoneStory = Template.bind({});





