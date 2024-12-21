import React, { useEffect, useState } from "react";
import {Container, Typography, List, ListItem, ListItemText, Alert, TextField, Button, Card} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import { getComments, addComment } from "../../slices/commentsSlice/commentsSlice.tsx";

interface CommentsProps {
    newsId: number;
}

const Comments: React.FC<CommentsProps> = ({ newsId }) => {
    const dispatch = useAppDispatch();
    const { comments, isLoading, error } = useAppSelector((state) => state.commentsList);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        if (newsId) {
            dispatch(getComments(newsId));
        }
    }, [newsId, dispatch]);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (author && text) {
            dispatch(addComment({ newsId, author, text }));
            setAuthor("");
            setText("");
        }
    };

    return (
        <Container>
            <Typography variant="h5">Comments</Typography>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">Не удалось загрузить комментарии.</Alert>
            ) : (
                <Card sx={{mt: 1}}>
                    <List>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <ListItem key={comment.id}>
                                    <ListItemText
                                        primary={`Author: ${comment.author}`}
                                        secondary={`Comment: ${comment.text}`}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <Typography>Comments not found</Typography>
                        )}
                    </List>
                </Card>
            )}

            <form onSubmit={handleCommentSubmit}>
                <TextField
                    label="Author"
                    variant="outlined"
                    fullWidth
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                   Add
                </Button>
            </form>
        </Container>
    );
};

export default Comments;
