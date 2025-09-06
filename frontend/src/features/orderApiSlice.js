import {baseApi} from "../api/baseApi.js";

export const orderApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: {...order}
            })
        }),

        //
    })
});

export const {
    useCreateOrderMutation,
   
} = orderApiSlice;
  