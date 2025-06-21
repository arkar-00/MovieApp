import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../types'
import { SCREEN_NAMES } from '../constants/base'
import { HomeScreen, MovieDetailScreen } from '../screens'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createStackNavigator<RootStackParamList>()
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAMES.BOTTOM_TAB}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name={SCREEN_NAMES.BOTTOM_TAB}
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.MOVIE_DETAIL}
          component={MovieDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})
