import Cookies from "js-cookie";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import {
  ILoginRespone,
  ILogoutRespone,
  IRegisterInput,
  IRegisterRespone,
  IUpdatePassword,
  IVerifyAccountInput,
  IVerifyAccountResponse,
  IloginInput,
} from "../../type/account";

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
  method: "POST",
});

// Tạo custom query. Xem trên RTK query authentication with reauth hoặc youtube của ô Dave Gray
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
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

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation<ILoginRespone, IloginInput>({
      query(body) {
        return {
          url: "user/login",
          method: "POST",
          body,
        };
      },
    }),
    register: build.mutation<IRegisterRespone, IRegisterInput>({
      query(body) {
        return {
          url: "user/register",
          method: "POST",
          body,
        };
      },
    }),
    verifyAccount: build.mutation<IVerifyAccountResponse, IVerifyAccountInput>({
      query(body) {
        return {
          url: "user/verify",
          method: "PUT",
          body,
        };
      },
    }),
    logout: build.mutation<ILogoutRespone, void>({
      query() {
        const userId = localStorage.getItem("userId");
        console.log({ userId });
        return {
          url: "user/logout",
          method: "POST",
          body: {
            userId,
          },
        };
      },
    }),
    sendEmailVerifyCode: build.mutation<{ message: string }, string>({
      query(email) {
        return {
          url: "user/sendVerifyCode",
          method: "POST",
          body: {
            email,
          },
        };
      },
    }),
    updatePassword: build.mutation<{ message: string }, IUpdatePassword>({
      query(body) {
        return {
          url: "user/resetPassword",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});
export const {
  useRegisterMutation,
  useVerifyAccountMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendEmailVerifyCodeMutation,
  useUpdatePasswordMutation,
} = accountApi;
