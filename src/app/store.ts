import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { tasksReducer } from '../features/TodolistsList/tasks-reducer'
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
// @ts-ignore
window.store = store
