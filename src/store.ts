import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { accountApi } from "./reduce/account/accountService";

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
  },
  // Thêm midleware để enable các tính năng catching, invalidation, polling của RTK-query
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(accountApi.middleware);
  },
});

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconent
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
