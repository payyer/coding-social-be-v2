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
import { apiSlice } from "../apiSlice";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ILoginRespone, IloginInput>({
      query(body) {
        return {
          url: "user/login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (_) => ["getFriendList"],
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
        return {
          url: "user/logout",
          method: "POST",
          body: {
            userId,
          },
        };
      },
      invalidatesTags: (result, error, body) => [
        { type: "getFriendList", id: "LIST" },
      ],
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
