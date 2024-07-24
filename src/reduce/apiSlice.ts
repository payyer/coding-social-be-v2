import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

let refreshInProgress = false;
let subscribers: Array<(token?: string) => void> = [];

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

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    if (!refreshInProgress) {
      refreshInProgress = true;
      const refreshResult = await baseQuery("/user/token", api, extraOptions);
      refreshInProgress = false;

      if (refreshResult.data) {
        const { accessToken, refreshToken } = (refreshResult.data as { tokenPair: { accessToken: string, refreshToken: string } }).tokenPair;
        localStorage.setItem("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);

        subscribers.forEach((callback) => callback(accessToken));
        subscribers = [];

        if (typeof args !== 'string') {
          args.headers = args.headers ? new Headers(args.headers) : new Headers();
          args.headers.set("accessToken", accessToken);
        }
        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        subscribers.forEach((callback) => callback());
        subscribers = [];
      }
    } else {
      result = await new Promise((resolve) => {
        subscribers.push((token) => {
          if (token) {
            if (typeof args !== 'string') {
              args.headers = args.headers ? new Headers(args.headers) : new Headers();
              args.headers.set("accessToken", token);
            }
            resolve(baseQuery(args, api, extraOptions));
          } else {
            resolve(result);
          }
        });
      });
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
    "resetComment"
  ],
});
