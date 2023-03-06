import { store } from '../store/store';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type AppReducerType = {
  statusApp: RequestStatusType;
  errorApp: string | null;
  isInitialized: boolean;
};

const initialState: AppReducerType = {
  statusApp: 'loading' as RequestStatusType,
  errorApp: null,
  isInitialized: false,
};
//Reducer
export const appReducer = (state = initialState, action: ActionsType): AppReducerType => {
  switch (action.type) {
    case 'APP/SET_STATUS': {
      return { ...state, statusApp: action.payload.statusApp };
    }
    case 'APP/SET_ERROR': {
      return { ...state, errorApp: action.payload.errorApp };
    }
    case 'APP/IS_INITIALIZED': {
      return { ...state, isInitialized: action.payload.value };
    }
    default:
      return state;
  }
};

//Action Type
type ActionsType =
  | ReturnType<typeof setStatusAppAC>
  | ReturnType<typeof setErrorAppAC>
  | ReturnType<typeof setInitializedAC>;

//Action Creator
export const setStatusAppAC = (statusApp: RequestStatusType) => {
  return {
    type: 'APP/SET_STATUS',
    payload: {
      statusApp,
    },
  } as const;
};
export const setErrorAppAC = (errorApp: string | null) => {
  return {
    type: 'APP/SET_ERROR',
    payload: {
      errorApp,
    },
  } as const;
};
export const setInitializedAC = (value: boolean) => {
  return {
    type: 'APP/IS_INITIALIZED',
    payload: {
      value,
    },
  } as const;
};
