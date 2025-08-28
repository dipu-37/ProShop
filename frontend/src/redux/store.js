import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from "../api/baseApi.js"

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

