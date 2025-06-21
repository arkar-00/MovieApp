import React, { useEffect, useState, useCallback } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NetInfo from '@react-native-community/netinfo'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Platform } from 'react-native'
import { store, persistor } from './src/store'
import AppNavigator from './src/navigation/AppNavigator'
import { setNetworkStatus } from './src/store/actions/movieActions'

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false)

  const handleNetworkChange = useCallback(
    (state: { isConnected: boolean | null }) => {
      store.dispatch(
        setNetworkStatus({
          isConnected: state.isConnected ?? false,
        }),
      )
    },
    [],
  )

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleNetworkChange)
    setIsReady(true)
    return unsubscribe
  }, [handleNetworkChange])

  if (!isReady) return null

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

export default App
