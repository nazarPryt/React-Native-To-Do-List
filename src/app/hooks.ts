import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppRootStateType } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
