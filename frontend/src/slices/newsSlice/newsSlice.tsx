import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export interface INews {
    id?: number;
    title: string;
    content: string;
    image: string | null;
    imageDate?: string;
}

interface NewsState {
    news: INews[];
    newsDetail: INews | null;
    isLoading: boolean;
    error: boolean;
}

const initialState: NewsState = {
    news: [],
    newsDetail: null,
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

export const getNewsById = createAsyncThunk<INews, number>(
    'news/getNewsById',
    async (id) => {
        const { data } = await axiosAPI.get<INews>(`/news/${id}`);
        return data;
    }
);

export const deleteNews = createAsyncThunk<number, number>(
    'news/deleteNews',
    async (id) => {
        await axiosAPI.delete(`/news/${id}`);
        return id;
    }
);

export const sendNews = createAsyncThunk<INews, INews>(
    'news/sendNews',
    async (news) => {
        const formData = new FormData();

        const keys = Object.keys(news) as (keyof INews)[];

        keys.forEach((key) => {
            const value = news[key];
            if (value !== null && value !== undefined) {
                formData.append(key, String(value));
            }
        });

        if (news.image) {
            formData.append('image', news.image);
        }

        const { data } = await axiosAPI.post<INews>('/news', formData);
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
            })
            .addCase(deleteNews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.news = state.news.filter((news) => news.id !== action.payload);
            })
            .addCase(deleteNews.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(sendNews.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(sendNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.news.push(action.payload);
            })
            .addCase(sendNews.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(getNewsById.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getNewsById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newsDetail = action.payload;
            })
            .addCase(getNewsById.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },

});

export const newsReducer = newsSlice.reducer;