import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from "../api/baseApi.js"
import cartSliceReducer from "../features/cartSlice.js"



export const store = configureStore({
  reducer: {
    // Add your reducers here
    [baseApi.reducerPath]: baseApi.reducer,
    cart : cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})


// access the cart state
//  const selectCart = (state) => state.cart;