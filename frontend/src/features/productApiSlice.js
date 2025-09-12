import { baseApi } from "../api/baseApi";

export const productApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (pageNumber) =>({
        url : "/products",
        params:{
          pageNumber,
        }
      }),
      providesTags: ["Product"],
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
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    createReview : builder.mutation({
      query:(data)=>({
        url: `products/${data.productId}/reviews`,
        method:'POST',
        body:data,
      }),
      invalidatesTags:['Product']
    })
  }),


});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productApiSlice;
