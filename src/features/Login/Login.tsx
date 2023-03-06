import React from 'react'

import { Button, TextInput } from '@react-native-material/core'
import Checkbox from 'expo-checkbox'
import { Formik } from 'formik'
import { StyleSheet, Text, View } from 'react-native'

import { useAppDispatch } from '../../app/hooks'
import { globalStyles } from '../../globalStyles'

import { loginTC } from './auth-reducer'

export const Login = () => {
  const dispatch = useAppDispatch()

  // const dss = (value: any) => {
  //   Alert.alert('Formik Data', `${value}`, [
  //     {
  //       text: 'Cancel',
  //       style: 'cancel',
  //     },
  //   ])
  // }

  return (
    <View style={[globalStyles.center]}>
      <Formik
        initialValues={{
          email: '' as string,
          password: '' as string,
          rememberMe: false as boolean,
        }}
        onSubmit={values => {
          dispatch(loginTC(values))
        }}
        // onSubmit={value => console.log(value)}
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

      {/*<View>*/}
      {/*  <Form onSubmit={formik.handleSubmit}>*/}
      {/*    /!*<FormLabel>*!/*/}
      {/*    /!*  <p>*!/*/}
      {/*    /!*    To log in get registered{' '}*!/*/}
      {/*    /!*    <a*!/*/}
      {/*    /!*      href={'https://social-network.samuraijs.com/'}*!/*/}
      {/*    /!*      target={'_blank'}*!/*/}
      {/*    /!*      rel="noreferrer"*!/*/}
      {/*    /!*    >*!/*/}
      {/*    /!*      here*!/*/}
      {/*    /!*    </a>*!/*/}
      {/*    /!*  </p>*!/*/}
      {/*    /!*  <p>or use common test account credentials:</p>*!/*/}
      {/*    /!*  <p> Email: free@samuraijs.com</p>*!/*/}
      {/*    /!*  <p>Password: free</p>*!/*/}
      {/*    /!*</FormLabel>*!/*/}
      {/*    <View>*/}
      {/*      <TextInput label="Email" {...formik.getFieldProps('email')} />*/}
      {/*      {formik.errors.email ? <View>{formik.errors.email}</View> : null}*/}
      {/*      <TextInput*/}
      {/*        // type="password"*/}
      {/*        label="Password"*/}
      {/*        {...formik.getFieldProps('password')}*/}
      {/*      />*/}
      {/*      {formik.errors.password ? <View>{formik.errors.password}</View> : null}*/}
      {/*      /!*<FormControlLabel*!/*/}
      {/*      /!*  label={'Remember me'}*!/*/}
      {/*      /!*  control={*!/*/}
      {/*      <Checkbox {...formik.getFieldProps('rememberMe')} value={formik.values.rememberMe} />*/}

      {/*      <Button*/}
      {/*        title={'Login'}*/}
      {/*        variant={'contained'}*/}
      {/*        color={'primary'}*/}
      {/*        onPress={submitHandler}*/}
      {/*      />*/}
      {/*    </View>*/}
      {/*  </Form>*/}
      {/*</View>*/}
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
