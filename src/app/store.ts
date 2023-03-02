import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'

import { appReducer } from '../reducers/app-reducer'
import { tasksReducer } from '../reducers/tasks-reducer'
import { todolistsReducer } from '../reducers/todolists-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  // auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
