import { combineReducers, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import user from './modules/user';
import util from './modules/utils';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ user, util });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore<any> = (context) => setupStore(context);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>; //state 기본타입
export type AppDispatch = typeof store.dispatch; // dispatch의 기본타입

export const storeDispatch = store.dispatch;
export const wrapper = createWrapper(makeStore);

//export default store;
