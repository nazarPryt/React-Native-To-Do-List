import React from 'react'

import { Button, TextInput } from '@react-native-material/core'
import Checkbox from 'expo-checkbox'
import { Formik } from 'formik'
import { StyleSheet, Text, View } from 'react-native'

import { useAppDispatch } from '../../app/hooks'
import { SnackBar } from '../../components/SnackBar/SnackBar'
import { globalStyles } from '../../globalStyles'

import { loginTC } from './auth-reducer'

export const Login = () => {
  const dispatch = useAppDispatch()

  return (
    <View style={[globalStyles.center]}>
      <SnackBar />
      <Formik
        initialValues={{
          email: '' as string,
          password: '' as string,
          rememberMe: false as boolean,
        }}
        onSubmit={values => {
          dispatch(loginTC(values))
        }}
      >
        {({ handleChange, setFieldValue, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={'email'}
            />
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={'password'}
            />
            <View style={styles.rememberMe}>
              <Text>Remember ME</Text>
              <Checkbox
                value={values.rememberMe}
                onValueChange={(value: boolean) => setFieldValue('rememberMe', value)}
              />
            </View>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    gap: 10,
    width: '78%',
  },
  input: {
    width: '80%',
  },
  rememberMe: {
    flexDirection: 'row',
    gap: 30,
  },
})
