import React, { useCallback } from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
  TransitionPresets,
} from '@react-navigation/bottom-tabs'
import { BottomAppBar } from '../components'
import { SCREEN_NAMES } from '../constants/base'
import { HomeScreen, MoreScreen, WalletScreen } from '../screens'

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator()
  const Tabbar = useCallback((props: BottomTabBarProps) => {
    return <BottomAppBar {...props} />
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={Tabbar}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        ...TransitionPresets.ShiftTransition,
      }}
    >
      <Tab.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_NAMES.WALLET} component={WalletScreen} />
      <Tab.Screen name={SCREEN_NAMES.MORE} component={MoreScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
