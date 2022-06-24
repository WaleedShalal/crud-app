import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, { payload }) => {
      state.posts.push(payload);
    },
    editPost: (state, { payload }) => {
      // eslint-disable-next-line array-callback-return
      state.posts.map((post) => {
        if (post.id === payload.id) {
          post.title = payload.updatedTitle;
          post.description = payload.updatedDescription;
        }
      });
    },
    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id !== payload.id);
    },
  },
});

export const { addPost, editPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
