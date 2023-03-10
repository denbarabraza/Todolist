export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type StatusTodoModal = 'Add todo' | 'Delete todo' | 'Open todo';
export type ModalStatus = 'idle' | StatusTodoModal;

type AppReducerType = {
  statusApp: RequestStatusType;
  errorApp: string | null;
  isInitialized: boolean;
  modalStatus: ModalStatus;
  isModalClosed: boolean;
};

const initialState: AppReducerType = {
  statusApp: 'loading' as RequestStatusType,
  errorApp: null,
  isInitialized: false,
  modalStatus: 'idle',
  isModalClosed: true,
};

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
    case 'APP/SET_MODAL_STATUS': {
      return { ...state, modalStatus: action.payload.status };
    }
    case 'APP/IS_CLOSING_MODAL': {
      return { ...state, isModalClosed: action.payload.value };
    }
    default:
      return state;
  }
};

// Action Type
type ActionsType =
  | ReturnType<typeof setStatusAppAC>
  | ReturnType<typeof setErrorAppAC>
  | ReturnType<typeof setInitializedAC>
  | ReturnType<typeof isClosingModal>
  | ReturnType<typeof setModalStatus>;

// Action Creator
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
export const setModalStatus = (status: ModalStatus) => {
  return {
    type: 'APP/SET_MODAL_STATUS',
    payload: {
      status,
    },
  } as const;
};
export const isClosingModal = (value: boolean) => {
  return {
    type: 'APP/IS_CLOSING_MODAL',
    payload: {
      value,
    },
  } as const;
};
