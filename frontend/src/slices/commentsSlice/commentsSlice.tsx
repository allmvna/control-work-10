import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export interface IComment {
    id?: number;
    author: string;
    text: string;
}

interface CommentsState {
    comments: IComment[];
    isLoading: boolean;
    error: boolean;
}

const initialState: CommentsState = {
    comments: [],
    isLoading: false,
    error: false,
};


export const getComments = createAsyncThunk<IComment[], number>(
    'comments/getComments',
    async (newsId) => {
        const { data } = await axiosAPI.get<IComment[]>(`/comments?news_id=${newsId}`);
        return data;
    }
);

export const addComment = createAsyncThunk<IComment, { newsId: number, author: string, text: string }>(
    'comments/addComment',
    async ({ newsId, author, text }) => {
        const { data } = await axiosAPI.post<IComment>('/comments', { newsId, author, text });
        return data;
    }
);

export const deleteComment = createAsyncThunk<number, number>(
    'comments/deleteComment',
    async (id) => {
        await axiosAPI.delete(`/comments/${id}`);
        return id;
    }
);

export const commentsSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments.push(action.payload);
            })
            .addCase(addComment.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(deleteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = state.comments.filter((news) => news.id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const commentsReducer = commentsSlice.reducer;
