import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MoreScreen</Text>
    </View>
  )
}

export default MoreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
