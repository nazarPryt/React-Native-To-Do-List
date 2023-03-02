import React, { ChangeEvent, memo, useState } from 'react'

import { Text } from '@react-native-material/core'
import { View } from 'react-native'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = memo(function (props: EditableSpanPropsType) {
  console.log('EditableSpan called')
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
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <View>
      <Text>input</Text>
    </View>
  ) : (
    //<TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
    <View>{props.value}</View>
    //onDoubleClick={activateEditMode}
  )
})
