import React, { memo, useCallback, useEffect } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { Button, IconButton, Text } from '@react-native-material/core'
import { View } from 'react-native'

import { TaskStatuses, TaskType } from '../../../api/todolists-api'
import { useAppDispatch } from '../../../app/hooks'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { fetchTasksTC } from '../tasks-reducer'
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer'

import { Task } from './Task/Task'

type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskType>
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  demo?: boolean
}

export const Todolist = memo(function ({ demo = false, ...props }: PropsType) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo) {
      return
    }

    dispatch(fetchTasksTC(props.todolist.id))
  }, [])

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id)
    },
    [props.addTask, props.todolist.id]
  )

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id)
  }
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title)
    },
    [props.todolist.id, props.changeTodolistTitle]
  )

  const onAllClickHandler = useCallback(
    () => props.changeFilter('all', props.todolist.id),
    [props.todolist.id, props.changeFilter]
  )
  const onActiveClickHandler = useCallback(
    () => props.changeFilter('active', props.todolist.id),
    [props.todolist.id, props.changeFilter]
  )
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.todolist.id),
    [props.todolist.id, props.changeFilter]
  )

  let tasksForTodolist = props.tasks

  if (props.todolist.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (props.todolist.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }

  return (
    <View>
      <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
      <Text>Delete</Text>
      {/*<IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>*/}
      {/*  <Delete />*/}
      {/*</IconButton>*/}

      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <View>
        {tasksForTodolist.map(t => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
          />
        ))}
      </View>
      <View style={{ paddingTop: 10 }}>
        <Button
          title={'All'}
          variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
          onPress={onAllClickHandler}
          color={'red'}
        />
        <Button
          title={'Active'}
          variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
          onPress={onActiveClickHandler}
          color={'red'}
        />
        <Button
          title={'Completed'}
          variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
          onPress={onCompletedClickHandler}
          color={'red'}
        />
      </View>
    </View>
  )
})
