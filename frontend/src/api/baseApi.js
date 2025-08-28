
import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
  }),
})

export const { useGetProductsQuery } = baseApi