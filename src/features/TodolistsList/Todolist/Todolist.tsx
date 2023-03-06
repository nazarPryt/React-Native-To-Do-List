import React, { memo, useCallback, useEffect } from 'react'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Button, IconButton, Pressable, Text } from '@react-native-material/core'
import { StyleSheet, View } from 'react-native'

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
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable style={{ width: '70%' }}>
          <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
        </Pressable>
        <IconButton
          icon={props => <Icon name="delete" {...props} />}
          onPress={removeTodolist}
          disabled={props.todolist.entityStatus === 'loading'}
        />
      </View>

      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <View style={styles.tasksWrapper}>
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
      <View style={styles.filter}>
        <Button
          title={'All'}
          variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
          onPress={onAllClickHandler}
          color={'primary'}
        />
        <Button
          title={'Active'}
          variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
          onPress={onActiveClickHandler}
          color={'primary'}
        />
        <Button
          title={'Completed'}
          variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
          onPress={onCompletedClickHandler}
          color={'primary'}
        />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E7EBF0',
    marginBottom: 30,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.75,
    // shadowRadius: 17,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tasksWrapper: {
    alignItems: 'center',
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
})
