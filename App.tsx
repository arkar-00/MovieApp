import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NetInfo from '@react-native-community/netinfo'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Platform } from 'react-native'
import { store, persistor } from './src/store'
import AppNavigator from './src/navigation/AppNavigator'
import { setNetworkStatus } from './src/store/actions/movieActions'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Set up network monitoring
    const unsubscribe = NetInfo.addEventListener((state) => {
      store.dispatch(
        setNetworkStatus({
          isConnected: state.isConnected ?? false,
        }),
      )
    })

    setIsReady(true)

    return unsubscribe
  }, [])

  if (!isReady) {
    // You can replace this with a custom splash screen
    return null
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar style="dark" translucent={Platform.OS === 'android'} />
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}
