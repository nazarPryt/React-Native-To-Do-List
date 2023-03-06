import React from 'react'

import { Button, Snackbar } from '@react-native-material/core'
import { View } from 'react-native'

import { setAppErrorAC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

export const SnackBar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.app.error)

  const handleClose = () => {
    dispatch(setAppErrorAC(null))
  }

  if (!error) {
    return <></>
  }

  return (
    <View style={{ position: 'absolute', start: 16, end: 16, bottom: 16, zIndex: 5 }}>
      <Snackbar
        message={error ? error : ''}
        action={
          <Button variant="text" title="Dismiss" color="#BB86FC" compact onPress={handleClose} />
        }
      />
    </View>
  )
}
