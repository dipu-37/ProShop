import { baseApi } from "../api/baseApi";
export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/user/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/user/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout : builder.mutation({
      query:()=>({
        url:`/user/auth/logout`,
        method: "POST",
      })
    })

    
  }),
});


export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = userApiSlice;