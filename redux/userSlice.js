import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: false,
  },
  reducers: {
    checkAdmin: (state, action) => {
      if (action.payload.admin) {
        state.admin = true;
        localStorage.setItem('x_2', true);
      }
    },
  },
});

export const { checkAdmin } = userSlice.actions;

export default userSlice.reducer;
