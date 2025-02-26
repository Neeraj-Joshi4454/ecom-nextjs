// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice'; 
import cartReducer from './slices/cartSlice';
import userReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    products: productReducer, 
    cart: cartReducer,
    users:userReducer,
  },
});

export default store;
