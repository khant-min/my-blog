import { configureStore } from "@reduxjs/toolkit";
import blogs from "../features/blogs";

export const store = configureStore({
  reducer: { allBlogs: blogs },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/*
  when I get this error ->
   A non-serializable value was detected in an action, in the path: `payload.headers`. 

   I found the answer from here -> 
   https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using

   I don't know why this happen and why this was fixed after adding middleware, but I will try to know more about that
   date -> 23.4.2023 SUN 
*/
