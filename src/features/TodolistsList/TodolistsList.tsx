import React, { useCallback, useEffect } from 'react'

import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { TaskStatuses } from '../../api/todolists-api'
import { useAppSelector } from '../../app/hooks'
import { AppRootStateType } from '../../app/store'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'

import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from './tasks-reducer'
import { Todolist } from './Todolist/Todolist'
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from './todolists-reducer'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useAppSelector(state => state.todolists)
  const tasks = useAppSelector(state => state.tasks)
  const dispatch = useDispatch()

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
      <View>
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
      </View>
    </>
  )
}