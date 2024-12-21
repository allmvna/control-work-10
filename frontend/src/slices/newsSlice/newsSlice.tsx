import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export interface INews {
    id: number;
    title: string;
    content: string;
    image: string | null;
    imageDate: string;
}

interface NewsState {
    news: INews[];
    isLoading: boolean;
    error: boolean;
}

const initialState: NewsState = {
    news: [],
    isLoading: false,
    error: false,
};

export const getNews = createAsyncThunk<INews[]>(
    'news/getNews',
    async () => {
        const { data } = await axiosAPI.get<INews[]>('/news');
        return data;
    }
);

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNews.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.news = action.payload;
            })
            .addCase(getNews.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },

});

export const newsReducer = newsSlice.reducer;