import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
// Tạo baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v2/",
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("accessToken", accessToken);
    }
    return headers;
  },
});

// Tạo custom query. Xem trên RTK query authentication with reauth hoặc youtube của ô Dave Gray
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    (result.error && result.error.status === 403) ||
    (result.error && result.error.status === 401)
  ) {
    // try to get a new token
    const refreshResult = await baseQuery("/user/token", api, extraOptions);
    console.log({ refreshResult });
    if (refreshResult.data) {
      console.log({ refreshRespone: refreshResult.data });
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: [
    "getFriendList",
    "postOfUser",
    "allPost",
    "getFriendReq",
    "friendListOfUser",
  ],
});
