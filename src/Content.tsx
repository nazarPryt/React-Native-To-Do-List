import React, { useState } from 'react'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Button, TextInput } from '@react-native-material/core'
import { View, StyleSheet } from 'react-native'

export const Content = () => {
  const [value, setValue] = useState('')

  return (
    <View style={styles.container}>
      <TextInput
        variant="standard"
        label="New To Do List"
        style={{ margin: 16, width: '70%' }}
        value={value}
        onChangeText={(text: string) => {
          setValue(text)
        }}
      />
      <Button title="Add" trailing={props => <Icon name="plus" {...props} />} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
