import { createSlice } from '@reduxjs/toolkit';

export type utilState = {
  restorePage: string | '';
};

const initialState: utilState = {
  restorePage: '',
};

export const util = createSlice({
  name: 'util',
  initialState,
  reducers: {
    restoreScrollPos: (state, action) => ({
      ...state,
      restorePage: action.payload,
    }),
  },
});

export const { restoreScrollPos } = util.actions;
export default util.reducer;
