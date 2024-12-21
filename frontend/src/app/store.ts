import { configureStore } from "@reduxjs/toolkit";
import {newsReducer} from "../slices/newsSlice/newsSlice.tsx";

export const store = configureStore({
  reducer: {
    list: newsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
