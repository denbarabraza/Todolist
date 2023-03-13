import React, { FC, memo } from 'react'

import { useNavigate } from 'react-router-dom'

import { ModalStatus } from '../../app/appReducer'
import { resetModalValue } from '../../common/utils/resetModalValue'
import { RootDispatch } from '../../store/store'

import { AddTodoTemplate } from './AddTodoTemplate/AddTodoTemplate'
import { DeleteTodoTemplate } from './DeleteTodoTemplate/DeleteTodoTemplate'
import { Modal } from './Modal'
import { OpenTodoTemplate } from './OpenTodoTemplate/OpenTodoTemplate'

type ModalWrapperType = {
  className?: string
  isOpen: boolean
  status: ModalStatus
  todoID: string | undefined
  name?: string
}

export const ModalWrapper: FC<ModalWrapperType> = memo(({ isOpen, status, todoID, name }) => {
  const navigate = useNavigate()
  const dispatch = RootDispatch()

  const onClickHandlerClosedModal = () => {
    resetModalValue(dispatch)

    return () => navigate(-1)
  }

  const addTodo = status === 'Add todo' && (
    <AddTodoTemplate title="New TODO" close={onClickHandlerClosedModal} />
  )
  const deleteTodo = status === 'Delete todo' && (
    <DeleteTodoTemplate
      title="Delete TODO"
      close={onClickHandlerClosedModal}
      todoID={todoID}
      name={name}
    />
  )
  const openTodo = status === 'Open todo' && (
    <OpenTodoTemplate close={onClickHandlerClosedModal} todoID={todoID} />
  )

  const form = addTodo || deleteTodo || openTodo || null

  return (
    <Modal isOpen={isOpen} onClose={onClickHandlerClosedModal}>
      {form}
    </Modal>
  )
})
