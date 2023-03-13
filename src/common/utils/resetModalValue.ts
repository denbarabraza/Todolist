import { Dispatch } from 'redux'

import { isClosingModal, setModalStatus } from '../../app/appReducer'

export const resetModalValue = (dispatch: Dispatch) => {
  dispatch(setModalStatus('idle'))
  dispatch(isClosingModal(true))
}
