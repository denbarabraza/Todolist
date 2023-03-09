import React, { FC, memo, useEffect } from 'react';

import { ModalStatus } from '../../app/appReducer';
import { resetModalValue } from '../../common/utils/resetModalValue';
import { RootDispatch } from '../../store/store';

import { AddTodoTemplate } from './AddTodoTemplate/AddTodoTemplate';
import { DeleteTodoTemplate } from './DeleteTodoTemplate/DeleteTodoTemplate';
import { Modal } from './Modal';

type ModalWrapperType = {
  className?: string;
  isOpen: boolean;
  status: ModalStatus;
  todoID?: string;
  name?: string;
};

export const ModalWrapper: FC<ModalWrapperType> = memo(
  ({ isOpen, status, todoID, name }) => {
    const dispatch = RootDispatch();

    useEffect(() => {}, [todoID]);

    const onClickHandlerClosedModal = () => {
      resetModalValue(dispatch);
    };

    const addTodo = status === 'Add todo' && (
      <AddTodoTemplate title="New TODO" close={onClickHandlerClosedModal} />
    );
    const deleteTodo = status === 'Delete todo' && (
      <DeleteTodoTemplate
        title="Delete TODO"
        close={onClickHandlerClosedModal}
        todoID={todoID}
        name={name}
      />
    );
    const form = addTodo || deleteTodo || null;

    return (
      <Modal isOpen={isOpen} onClose={onClickHandlerClosedModal}>
        {form}
      </Modal>
    );
  },
);
