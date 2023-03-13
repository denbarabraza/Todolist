import React, { FC, memo, ReactNode } from 'react'

import s from 'common/styles/Modal.module.css'

type ModalType = {
  children?: ReactNode
  isOpen: boolean
  onClose?: () => void
}

export const Modal: FC<ModalType> = memo(({ children, onClose, isOpen }) => {
  return (
    <div className={isOpen ? s.modalActive : s.modal} onClick={onClose}>
      <div
        className={isOpen ? s.modalContentActive : s.modalContent}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
})
