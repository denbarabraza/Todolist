import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore } from 'redux';
import { v1 } from 'uuid';

import { TaskPriorities, TaskStatuses } from '../api/api';
import { taskReducer } from '../features/tasks/taskReducer';
import { todolistId1, todolistId2, todoReducer } from '../features/todos/todoReducer';
import { RootStoreType } from '../store/store';

const rootReducer = combineReducers({
  task: taskReducer,
  todolist: todoReducer,
});

const initialGlobalState = {
  task: {
    [todolistId1]: {
      data: [
        {
          id: v1(),
          title: 'HTML&CSS',
          description: ' ',
          status: TaskStatuses.Completed,
          priority: TaskPriorities.Low,
          startDate: '',
          deadline: '',
          todoListId: todolistId1,
          order: 0,
          addedDate: '',
        },
        {
          id: v1(),
          title: 'JS',
          description: '',
          status: TaskStatuses.Completed,
          priority: TaskPriorities.Low,
          startDate: '',
          deadline: '',
          todoListId: todolistId1,
          order: 0,
          addedDate: '',
        },
      ],
      filter: 'All',
    },
    [todolistId2]: {
      data: [
        {
          id: v1(),
          title: 'Milk',
          description: ' ',
          status: TaskStatuses.Completed,
          priority: TaskPriorities.Low,
          startDate: '',
          deadline: '',
          todoListId: todolistId2,
          order: 0,
          addedDate: '',
        },
        {
          id: v1(),
          title: 'Salt',
          description: '',
          status: TaskStatuses.Completed,
          priority: TaskPriorities.Low,
          startDate: '',
          deadline: '',
          todoListId: todolistId2,
          order: 0,
          addedDate: '',
        },
      ],
      filter: 'All',
    },
  },
  todolist: [
    { id: todolistId1, title: 'What to learn' },
    { id: todolistId2, title: 'What to buy' },
  ],
};

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState as RootStoreType,
);

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
