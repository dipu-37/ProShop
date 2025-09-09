import { baseApi } from "../api/baseApi";

export const productApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `/products/admin/create`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
} = productApiSlice;
