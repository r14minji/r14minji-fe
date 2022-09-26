import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import userReducer from './slice/user';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore<any> = (context) => setupStore(context);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const storeDispatch = store.dispatch;
export const wrapper = createWrapper(makeStore);
