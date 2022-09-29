import { createSlice } from '@reduxjs/toolkit';

export type userValue = {
  name: string | null;
  id: string | null;
  isLogin?: string | null;
};

const initialState: userValue = {
  name: '',
  id: '',
  isLogin: null,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //login 성공시
    loginUser: (state, action) => {
      state.name = action.payload.NAME;
      state.id = action.payload.ID;
      return state;
    },
    // logout 선택시
    clearUser: (state, action) => {
      state.name = '';
      state.id = '';
      return state;
    },
  },
});

export const { loginUser, clearUser } = user.actions;
export default user.reducer;
