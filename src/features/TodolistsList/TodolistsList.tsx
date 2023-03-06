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
    dispatch(removeTaskTC(id, todolistId))
  }, [])

  const addTask = useCallback(function (title: string, todolistId: string) {
    dispatch(addTaskTC(title, todolistId))
  }, [])

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    dispatch(updateTaskTC(id, { status }, todolistId))
  }, [])

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    dispatch(updateTaskTC(id, { title: newTitle }, todolistId))
  }, [])

  const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }, [])

  const removeTodolist = useCallback(function (id: string) {
    dispatch(removeTodolistTC(id))
  }, [])

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    dispatch(changeTodolistTitleTC(id, title))
  }, [])

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
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
