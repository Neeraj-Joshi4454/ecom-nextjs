

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      throw new Error('Please login first to access this page');
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
  
    const data = await response.json();
    return data;
  });


export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  const token = localStorage.getItem('auth_token');
  if(!token){
    throw new Error('Please login first to access this page');
  }

  const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data;
})


const initialState = {
  items: [],
  status: 'idle',
  error: null,
  count : 0
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
        state.count = action.payload.count;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
        state.count = action.payload.count;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default productSlice.reducer;
