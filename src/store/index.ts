import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { rootReducer } from './reducers'
import { rootSaga } from './sagas'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const createSagaMiddleware = require('redux-saga')

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['movies'], // Only persist movies data
  blacklist: [], // Don't persist network state
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware.default()

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
  devTools: __DEV__,
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
