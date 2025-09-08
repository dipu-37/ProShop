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
    }),
    profile: builder.mutation({
      query: (data)=>({
        url:`users/profile`,
        method: 'PUT',
        body: data
      })
    }),
    getUser : builder.query({
      query: ()=>({
        url :`users`
      }),
      keepUnusedDataFor : 5,
    }),
    deleteUser : builder.mutation({
      query :(userId)=>({
        url:`users/${userId}`,
        method :`DELETE`
      })
    }),
    getUserDetails :builder.query({
      query :(id)=>({
        url:`users/${id}`
      }),
      keepUnusedDataFor : 5,
    }),
    updateUser :builder.mutation({
      query:(data)=>({
        url: `users/${data.userId}`,
        method : 'PUT',
        body : data,
      })
    })

    
  }),
});


export const { useLoginMutation, useLogoutMutation, useRegisterMutation ,useUpdateUserMutation,useGetUserDetailsQuery,useDeleteUserMutation,useGetUserQuery,useProfileMutation} = userApiSlice;