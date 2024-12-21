import { configureStore } from "@reduxjs/toolkit";
import {newsReducer} from "../slices/newsSlice/newsSlice.tsx";
import {commentsReducer} from "../slices/commentsSlice/commentsSlice.tsx";

export const store = configureStore({
  reducer: {
    newsList: newsReducer,
    commentsList: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
