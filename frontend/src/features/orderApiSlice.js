import {apiSlice} from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addOrderItems: builder.mutation({
            query: (order) => ({
                url: '/api/orders',
                method: 'POST',
                body: {...order}
            })
        }),

        //
    })
});

export const {
    useAddOrderItemsMutation,
   
} = orderApiSlice;
  