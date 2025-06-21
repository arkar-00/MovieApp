import { StyleSheet, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { COLORS } from '../constants/base'

interface ScreenWrapperProps extends SafeAreaViewProps {
  children: ReactNode
  style?: ViewStyle | ViewStyle[]
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  edges = ['top', 'left', 'right'],
  ...rest
}) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={edges} {...rest}>
      {children}
    </SafeAreaView>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
})
