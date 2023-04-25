import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axios from "../../api/axios";
import { BlogProps } from "../../blog.types";
const BLOG = "/blog";

interface InitialStateTypes {
  blogs: BlogProps[];
  status: string;
  error: any;
}

const initialState: InitialStateTypes = {
  blogs: [],
  status: "idle",
  error: null,
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => await axios.get(BLOG)
);

export const editBlog = createAsyncThunk(
  "blogs/editBlog",
  async (data: object) => await axios.put(BLOG, data)
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id: string) =>
    await axios.delete(BLOG, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id },
    })
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBlogs.fulfilled,
        (state, action: PayloadAction<any | BlogProps[]>) => {
          state.status = "succeeded";
          state.blogs = action.payload.data;
        }
      )
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(deleteBlog.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.status = "succeeded";
    // });
  },
});

export const selectAllBlogs = (state: RootState) => state.allBlogs.blogs;
export const selectStatus = (state: RootState) => state.allBlogs.status;
export const selectError = (state: RootState) => state.allBlogs.error;

export default blogSlice.reducer;
