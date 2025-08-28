
import { baseApi } from "../api/baseApi";

export const productApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productApiSlice;
