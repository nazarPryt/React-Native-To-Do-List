import React from 'react'

import { ActivityIndicator, Stack } from '@react-native-material/core'

export const LinearProgress = () => {
  return (
    <Stack
      fill
      center
      spacing={4}
      style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 3 }}
    >
      <ActivityIndicator size="large" color="#00ff00" />
    </Stack>
  )
}
