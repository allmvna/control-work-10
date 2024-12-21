import React, {useEffect, useState} from "react";
import {
    Alert,
    Button,
    Card,
    CircularProgress,
    Container,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import {addComment, deleteComment, getComments} from "../../slices/commentsSlice/commentsSlice.tsx";
import {Delete} from "@mui/icons-material";

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
            <Typography sx={{fontWeight: "bold"}} variant="h6">Comments</Typography>
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
                                    <Button variant='contained'
                                            sx={{
                                                backgroundColor: "red",
                                            }}
                                            onClick={() => dispatch(deleteComment(comment.id!))}
                                    >
                                        {isLoading ? <CircularProgress size={24}/> : <Delete/>}
                                    </Button>
                                </ListItem>
                            ))
                        ) : (
                            <Typography>Comments not found</Typography>
                        )}
                    </List>
                </Card>
            )}

            <Typography color="success" variant="h6" sx={{mt: 1, fontWeight: "bold"}}>Add new comment:</Typography>
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
                />
                <Button type="submit" variant="contained" color="success" disabled={isLoading}>
                   Add
                </Button>
            </form>
        </Container>
    );
};

export default Comments;
