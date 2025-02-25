import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from 'next-auth/jwt';
import getLoggedInUserId from '@/utils/getLoggedInUserId';


export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
//   const token = getToken();
  const token = localStorage.getItem('auth_token');
  const userId = localStorage.getItem('user_id')
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`,
              'userId' : userId
            }
        });
        
        const data = await response.json();
        console.log("token for fetch cart",data)
    if (!response.ok) throw new Error(data.error || 'Failed to fetch cart');
    
    return data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { rejectWithValue }) => {
//   const token = getToken()
  const token = localStorage.getItem('auth_token')
  try {
    const userId = getLoggedInUserId(); 

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, productId, quantity })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to add product to cart');

    return data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ itemId, quantity }, { rejectWithValue }) => {
        const token = localStorage.getItem('auth_token');
        console.log('token for update quantity', token)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to update quantity");
  
        return data.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ itemId }, { rejectWithValue }) => {
        const token = localStorage.getItem('auth_token')
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to remove item");
  
        return itemId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    // Update Quantity
    .addCase(updateCartQuantity.fulfilled, (state, action) => {
    state.cart = action.payload;
    })

    // Remove Item
    .addCase(deleteCartItem.fulfilled, (state, action) => {
    state.cart.items = state.cart.items.filter((item) => item._id !== action.payload);
    });
  },
});

export default cartSlice.reducer;


