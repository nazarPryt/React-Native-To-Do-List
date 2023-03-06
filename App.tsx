import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'

import { store } from './src/app/store'
import { Screen } from './src/Screens/Screen'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Screen />
      </NavigationContainer>
    </Provider>
  )
}
