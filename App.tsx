import { View } from 'react-native'
import { Provider } from 'react-redux'

import { Main } from './src/app/Main'
import { store } from './src/app/store'

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Main />
      </View>
    </Provider>
  )
}
