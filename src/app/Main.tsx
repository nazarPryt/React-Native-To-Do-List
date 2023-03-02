import React from 'react'

import './App.css'
import { View } from 'react-native'

import { TodolistsList } from '../features/TodolistsList/TodolistsList'

type PropsType = {
  demo?: boolean
}

export function Main({ demo = false }: PropsType) {
  //const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

  return (
    <div className="App">
      {/*<ErrorSnackbar />*/}
      {/*<AppBar position="static">*/}
      {/*    <Toolbar>*/}
      {/*        <IconButton edge="start" color="inherit" aria-label="menu">*/}
      {/*            <Menu/>*/}
      {/*        </IconButton>*/}
      {/*        <Typography variant="h6">*/}
      {/*            News*/}
      {/*        </Typography>*/}
      {/*        <Button color="inherit">Login</Button>*/}
      {/*    </Toolbar>*/}
      {/* { status === 'loading' &&  <LinearProgress /> }*/}
      {/*</AppBar>*/}
      <View>
        <TodolistsList demo={demo} />
      </View>
    </div>
  )
}
