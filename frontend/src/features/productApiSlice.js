import { IoBody } from "react-icons/io5";
import { baseApi } from "../api/baseApi";

export const productApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
       providesTags: ['Product'],
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
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/products/${productId}`,
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }),
      invalidatesTags: ["Product"]
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApiSlice;
