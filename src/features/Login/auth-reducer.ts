import { Dispatch } from 'redux'

import { authAPI, LoginParamsType } from '../../api/todolists-api'
import {
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

const initialState: InitialStateType = {
  isLoggedIn: false as boolean,
}

type InitialStateType = {
  isLoggedIn: boolean
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

// actions

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const logoutTC = () => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

// types

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

type ThunkDispatch = Dispatch<AuthActionsType | SetAppStatusActionType | SetAppErrorActionType>
