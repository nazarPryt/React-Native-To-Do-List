import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/Login/auth-reducer'
import { taskActionType, tasksReducer } from '../features/TodolistsList/tasks-reducer'
import { todolistActionType, todolistsReducer } from '../features/TodolistsList/todolists-reducer'

import { appReducer, appReducerActionType } from './app-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType =
  | taskActionType
  | todolistActionType
  | appReducerActionType
  | AuthActionsType

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>
// @ts-ignore
window.store = store
