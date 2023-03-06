import { v1 } from 'uuid';
import { ResponseResult, todoAPI, TodoType } from '../../api/api';
import { Dispatch } from 'redux';
import { setErrorAppAC, setStatusAppAC } from '../../app/appReducer';
import { changeEntityStatusAC } from '../tasks/taskReducer';
import { AxiosError } from 'axios';

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: TodoType[] = [];

//Reducer
export const todoReducer = (state = initialState, action: ActionsType): TodoType[] => {
  switch (action.type) {
    case 'REMOVE_TODO': {
      return state.filter(e => e.id !== action.payload.todoID);
    }
    case 'ADD_TODO': {
      return [action.payload.newTodo, ...state];
    }
    case 'SET_UPDATE_TITLE_TODO': {
      return state.map(t =>
        t.id === action.payload.todoID ? { ...t, title: action.payload.upValue } : t,
      );
    }
    case 'SET_TODO_FROM_BACK': {
      return [...action.payload.todos, ...state];
    }
    default:
      return state;
  }
};
//Action Type
type ActionsType =
  | ReturnType<typeof removeTodoAC>
  | ReturnType<typeof addNewTodoAC>
  | ReturnType<typeof setUpTodoTitleAC>
  | ReturnType<typeof setTodosAC>;

//Action Creator
export const removeTodoAC = (todoID: string) => {
  return {
    type: 'REMOVE_TODO',
    payload: {
      todoID,
    },
  } as const;
};
export const addNewTodoAC = (newTodo: TodoType) => {
  return {
    type: 'ADD_TODO',
    payload: {
      newTodo,
    },
  } as const;
};
export const setUpTodoTitleAC = (todoID: string, upValue: string) => {
  return {
    type: 'SET_UPDATE_TITLE_TODO',
    payload: {
      upValue,
      todoID,
    },
  } as const;
};
export const setTodosAC = (todos: TodoType[]) => {
  return {
    type: 'SET_TODO_FROM_BACK',
    payload: {
      todos,
    },
  } as const;
};

//Thunk Creator
export const setTodosTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAppAC('loading'));
  todoAPI
    .getTodo()
    .then(res => {
      dispatch(setTodosAC(res));
      dispatch(setStatusAppAC('succeeded'));
    })
    .catch((e: AxiosError<{ message: string }>) => {
      let err = e.response ? e.response?.data.message : e.message;
      dispatch(setErrorAppAC(err));
      dispatch(setStatusAppAC('failed'));
    });
};
export const createTodoTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAppAC('loading'));
  todoAPI
    .createTodo(title)
    .then(res => {
      debugger;
      if (res.resultCode === ResponseResult.OK) {
        dispatch(addNewTodoAC(res.data.item));
        dispatch(setStatusAppAC('succeeded'));
      } else {
        if (res.messages.length) {
          dispatch(setErrorAppAC(res.messages[0]));
        } else {
          dispatch(setErrorAppAC('Some error'));
        }
        dispatch(setStatusAppAC('failed'));
      }
    })
    .catch((e: AxiosError<{ message: string }>) => {
      let err = e.response ? e.response?.data.message : e.message;
      dispatch(setErrorAppAC(err));
      dispatch(setStatusAppAC('failed'));
    });
};
export const deleteTodoTC = (todoID: string) => (dispatch: Dispatch) => {
  dispatch(changeEntityStatusAC(todoID, 'loading'));
  dispatch(setStatusAppAC('loading'));
  todoAPI
    .deleteTodo(todoID)
    .then(res => {
      dispatch(removeTodoAC(todoID));
      dispatch(setStatusAppAC('succeeded'));
      dispatch(changeEntityStatusAC(todoID, 'succeeded'));
    })
    .catch((e: AxiosError<{ message: string }>) => {
      let err = e.response ? e.response?.data.message : e.message;
      dispatch(setErrorAppAC(err));
      dispatch(setStatusAppAC('failed'));
      dispatch(changeEntityStatusAC(todoID, 'failed'));
    });
};
export const updateTodoTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAppAC('loading'));
  todoAPI
    .updateTodo(todoID, title)
    .then(res => {
      if (res.resultCode === ResponseResult.OK) {
        dispatch(setUpTodoTitleAC(todoID, title));
        dispatch(setStatusAppAC('succeeded'));
      } else {
        if (res.messages.length) {
          dispatch(setErrorAppAC(res.messages[0]));
        } else {
          dispatch(setErrorAppAC('Some error'));
        }
        dispatch(setStatusAppAC('succeeded'));
      }
    })
    .catch((e: AxiosError<{ message: string }>) => {
      debugger;
      let err = e.response ? e.response?.data.message : e.message;
      dispatch(setErrorAppAC(err));
      dispatch(setStatusAppAC('failed'));
      dispatch(changeEntityStatusAC(todoID, 'failed'));
    });
};
