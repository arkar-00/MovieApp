import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'
import AppNavigator from './src/navigation/AppNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent={Platform.OS === 'android'} />
      <AppNavigator />
    </SafeAreaProvider>
  )
}
