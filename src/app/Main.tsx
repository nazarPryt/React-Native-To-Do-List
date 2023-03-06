import React from 'react'

import { View } from 'react-native'

import { LinearProgress } from '../components/LinearProgress/LinearProgress'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { globalStyles } from '../globalStyles'

import { useAppSelector } from './hooks'

type PropsType = {
  demo?: boolean
}

export function Main({ demo = false }: PropsType) {
  const status = useAppSelector(state => state.app.status)
  // const dispatch = useAppDispatch()

  return (
    <View style={[globalStyles.center]}>
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
      {status === 'loading' && <LinearProgress />}
      <View>
        <TodolistsList demo={demo} />
      </View>
    </View>
  )
}
