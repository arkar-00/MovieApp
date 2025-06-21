import React, { memo, useEffect } from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/base'

export type TabBarItemProps = {
  text: string
  icon: React.ReactElement
  isActive: boolean
  onPress: () => void
  index: number
}

const ANIMATION_CONFIG = {
  duration: 300,
  easing: Easing.inOut(Easing.quad),
}

const TabBarItem: React.FC<TabBarItemProps> = ({
  text,
  icon,
  isActive,
  onPress,
  index,
}) => {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.8)

  useEffect(() => {
    opacity.value = withDelay(index * 50, withTiming(1, ANIMATION_CONFIG))
    scale.value = withDelay(index * 50, withTiming(1, ANIMATION_CONFIG))
  }, [index, opacity, scale])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.container, !isActive && styles.inactive]}
      >
        {icon}
        <Text
          style={[
            styles.text,
            isActive ? styles.textActive : styles.textInactive,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  } as ViewStyle,
  inactive: {
    opacity: 0.4,
  } as ViewStyle,
  text: {
    fontSize: FONT_SIZES.SMALL,
  } as TextStyle,
  textActive: {
    fontWeight: FONT_WEIGHTS.BOLD,
  } as TextStyle,
  textInactive: {
    fontWeight: FONT_WEIGHTS.NORMAL,
  } as TextStyle,
})

export default memo(TabBarItem)
