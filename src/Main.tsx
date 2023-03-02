import React from 'react'

import { AppBar, Box, Flex, Spacer } from '@react-native-material/core'

import { Content } from './Content'

export const Main = () => {
  return (
    <Flex style={{ height: '100%' }}>
      <Box h={50} style={{ backgroundColor: 'lightgreen' }} />
      <AppBar title="To Do List" />

      <Content />
      <Spacer />
      <Box h={30} style={{ backgroundColor: 'lightblue' }} />
    </Flex>
  )
}
