import React, { ChangeEvent, memo, useCallback } from 'react'

import { Button, Text } from '@react-native-material/core'
import Checkbox from 'expo-checkbox'
import { View } from 'react-native'

import { TaskStatuses, TaskType } from '../../../../api/todolists-api'
import { useAppSelector } from '../../../../app/hooks'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'

type TaskPropsType = {
  task: TaskType
  todolistId: string
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
}
export const Task = memo((props: TaskPropsType) => {
  const loading = useAppSelector(state => state.app.status)
  const onClickHandler = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props.task.id, props.todolistId]
  )

  const onChangeHandler = useCallback(
    (value: boolean) => {
      let newIsDoneValue = value

      props.changeTaskStatus(
        props.task.id,
        newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        props.todolistId
      )
    },
    [props.task.id, props.todolistId]
  )

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },
    [props.task.id, props.todolistId]
  )

  return (
    <View
      key={props.task.id}
      style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      //className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
    >
      <Checkbox
        value={props.task.status === TaskStatuses.Completed}
        // color="primary"
        onValueChange={onChangeHandler}
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />

      <Button disabled={loading === 'loading'} title="Delete" onPress={onClickHandler} />
    </View>
  )
})
