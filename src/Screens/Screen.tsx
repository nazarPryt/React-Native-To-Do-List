import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useAppSelector } from '../app/hooks'
import { Main } from '../app/Main'
import { Login } from '../features/Login/Login'

const Stack = createNativeStackNavigator()

export const Screen = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={Main} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  )
}
