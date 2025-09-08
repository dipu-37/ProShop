import { baseApi } from "../api/baseApi.js";

export const orderApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrders : builder.query({
     query : ()=>({
      url : `/orders`,
     })
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/orders/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: `/config/paypal`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrder : builder.query({
      query: ()=>({
        url : `orders/myorders`,
      }),
       keepUnusedDataFor: 5
    })
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery , usePayOrderMutation,
  useGetPaypalClientIdQuery,useGetMyOrderQuery,useGetOrdersQuery} =
  orderApiSlice;
