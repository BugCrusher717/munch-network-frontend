import { configureStore } from "@reduxjs/toolkit";
import authReducer from "~/reducers/authSlice";
import setPriceReducer from "~/reducers/setPriceSlice";
import discoverReducer from "~/reducers/discoverSlice";
import buyNowReducer from "~/reducers/buyNowSlice";
import notificationReducer from "~/reducers/notificationSlice";
import congratReducer from "~/reducers/congratSlice";
import profileReducer from "~/reducers/profileSlice";
import swapNowReducer from "~/reducers/swapNowSlice";
import collectionReducer from "~/reducers/collectionSlice";
import searchReducer from "~/reducers/searchSlice";
import offerReducer from "~/reducers/offerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    setPrice: setPriceReducer,
    discover: discoverReducer,
    buyNow: buyNowReducer,
    notification: notificationReducer,
    congrat: congratReducer,
    profile: profileReducer,
    swapNow: swapNowReducer,
    collection: collectionReducer,
    search: searchReducer,
    offer: offerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
