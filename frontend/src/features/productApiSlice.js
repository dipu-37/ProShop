import { IoBody } from "react-icons/io5";
import { baseApi } from "../api/baseApi";

export const productApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    GetProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `/products/admin/create`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct:builder.mutation({
      query : (productId,data)=>({
        url : ``,
        method :'PUT',
        body : data
      })
    })
  }),
});

export const {
  useGetProductsQuery,
 useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation
} = productApiSlice;
