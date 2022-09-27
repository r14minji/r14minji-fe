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
      // name, id에 API 값 받아오기
      state.name = action.payload.NAME;
      state.id = action.payload.ID;
      return state;
    },
    // logout 선택시
    clearUser: (state) => {
      // name, id 값을 비워줌.
      state.name = '';
      state.id = '';
      return state;
    },
  },
});

export const { loginUser, clearUser } = user.actions;
export default user.reducer;
