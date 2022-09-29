import {
  combineReducers,
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import user from './modules/user';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ userSlice: user });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV === 'development',
});

const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore<any> = (context) => setupStore(context);
export const persistor = persistStore(store);

//state 기본타입, dispatch의 기본타입
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const storeDispatch = store.dispatch;
export const wrapper = createWrapper(makeStore);
