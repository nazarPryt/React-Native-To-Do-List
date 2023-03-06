import React from 'react'

import { View } from 'react-native'

import { LinearProgress } from '../components/LinearProgress/LinearProgress'
import { SnackBar } from '../components/SnackBar/SnackBar'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { globalStyles } from '../globalStyles'

import { useAppSelector } from './hooks'

type PropsType = {
  demo?: boolean
}

export function Main({ demo = false }: PropsType) {
  const status = useAppSelector(state => state.app.status)
  // const dispatch = useAppDispatch()

  return (
    <View style={[globalStyles.center]}>
      <SnackBar />
      {status === 'loading' && <LinearProgress />}
      <View>
        <TodolistsList demo={demo} />
      </View>
    </View>
  )
}
