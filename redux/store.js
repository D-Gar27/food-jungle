import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './foodBag.js';
import adminReducer from './userSlice.js';

export default configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminReducer,
  },
});
