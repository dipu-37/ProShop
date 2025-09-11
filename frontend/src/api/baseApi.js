import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  credentials: "include",
  prepareHeaders :(headers)=>{
  //  headers.set("Content-Type","application/json");
    return headers
  }
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User", "Order", "Product"],   // cache
  endpoints: () => ({}),
});
