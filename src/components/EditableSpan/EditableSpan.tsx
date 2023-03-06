import React, { memo, useState } from 'react'

import { Text, TextInput } from '@react-native-material/core'
import { View } from 'react-native'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const changeTitle = (text: string) => {
    setTitle(text)
  }

  return editMode ? (
    <TextInput
      value={title}
      onChangeText={changeTitle}
      autoFocus
      onBlur={activateViewMode}
      style={{ width: '70%' }}
    />
  ) : (
    <View>
      <Text onPress={activateEditMode}>{props.value}</Text>
    </View>
  )
})
