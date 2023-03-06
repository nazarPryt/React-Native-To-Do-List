import React, { useCallback, useEffect } from 'react'

import { ScrollView, View } from 'react-native'

import { TaskStatuses } from '../../api/todolists-api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'

import { addTaskTC, removeTaskTC, updateTaskTC } from './tasks-reducer'
import { Todolist } from './Todolist/Todolist'
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
} from './todolists-reducer'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useAppSelector(state => state.todolists)
  const tasks = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo) {
      return
    }

    dispatch(fetchTodolistsTC())
  }, [])

  const removeTask = useCallback(function (id: string, todolistId: string) {
    const thunk = removeTaskTC(id, todolistId)

    dispatch(thunk)
  }, [])

  const addTask = useCallback(function (title: string, todolistId: string) {
    const thunk = addTaskTC(title, todolistId)

    dispatch(thunk)
  }, [])

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    const thunk = updateTaskTC(id, { status }, todolistId)

    dispatch(thunk)
  }, [])

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    const thunk = updateTaskTC(id, { title: newTitle }, todolistId)

    dispatch(thunk)
  }, [])

  const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, value)

    dispatch(action)
  }, [])

  const removeTodolist = useCallback(function (id: string) {
    const thunk = removeTodolistTC(id)

    dispatch(thunk)
  }, [])

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const thunk = changeTodolistTitleTC(id, title)

    dispatch(thunk)
  }, [])

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title)

      dispatch(thunk)
    },
    [dispatch]
  )

  return (
    <>
      <View style={{ padding: 20 }}>
        <AddItemForm addItem={addTodolist} />
      </View>
      <ScrollView>
        {todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <View key={tl.id}>
              <View style={{ padding: 10 }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </View>
            </View>
          )
        })}
      </ScrollView>
    </>
  )
}
