import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./../postsSlice/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
});
