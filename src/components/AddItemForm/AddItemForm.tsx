import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

import { Button, Text, TextInput } from '@react-native-material/core'
import { View } from 'react-native'

import { useAppSelector } from '../../app/hooks'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = memo(function ({ addItem, disabled = false }: AddItemFormPropsType) {
  const loading = useAppSelector(state => state.app.status)
  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (text: string) => {
    setTitle(text)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItemHandler()
    }
  }

  return (
    <View>
      <TextInput
        label="Title"
        value={title}
        helperText={error ? error : ''}
        onChangeText={onChangeHandler}
      />
      {/*<TextField*/}
      {/*  variant="outlined"*/}
      {/*  disabled={disabled}*/}
      {/*  error={!!error}*/}
      {/*  value={title}*/}
      {/*  onChange={onChangeHandler}*/}
      {/*  onKeyPress={onKeyPressHandler}*/}
      {/*  label="Title"*/}
      {/*  helperText={error}*/}
      {/*/>*/}
      <Button
        disabled={loading === 'loading'}
        title="Add"
        // loading={loading === 'loading'}
        // loadingIndicatorPosition="overlay"
        onPress={addItemHandler}
      />
    </View>
  )
})
