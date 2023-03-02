import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

import { Text } from '@react-native-material/core'
import { View } from 'react-native'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = memo(function ({ addItem, disabled = false }: AddItemFormPropsType) {
  console.log('AddItemForm called')

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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
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
      <Text>input</Text>
      {/*<IconButton color="primary" onClick={addItemHandler} disabled={disabled}>*/}
      {/*  <AddBox />*/}
      {/*</IconButton>*/}
      <Text>add</Text>
    </View>
  )
})
