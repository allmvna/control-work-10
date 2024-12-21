import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {Card, CardContent, Container, Typography, Alert, CardMedia} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { getNewsById } from "../../slices/newsSlice/newsSlice.tsx";
import axiosAPI from "../../axiosAPI.ts";
import Loader from "../../UI/Loader/Loader.tsx";

const NewsDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { newsDetail, isLoading, error } = useAppSelector((state) => state.list);

    useEffect(() => {
        if (id) {
            dispatch(getNewsById(Number(id)));
        }
    }, [id, dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error">There is no data. Please try again later!</Alert>
            </Container>
        );
    }

    if (!newsDetail) {
        return (
            <Container>
                <Alert severity="warning">News not found.</Alert>
            </Container>
        );
    }


    if (!newsDetail) {
        return (
            <Container>
                <Alert severity="warning">News not found.</Alert>
            </Container>
        );
    }

    return (
        <>
            <Container>
            <Card
                sx={{
                    minWidth: 275,
                    border: "3px solid",
                    borderRadius: "10px",
                    marginTop: 2,
                }}
            >
                <CardContent>
                    <Typography variant="h4" gutterBottom>{newsDetail.title}</Typography>
                    {newsDetail.imageDate && (
                        <Typography color="textSecondary">{newsDetail.imageDate}</Typography>
                    )}
                    {newsDetail.image && (
                        <CardMedia
                            component="img"
                            src={axiosAPI + `${newsDetail.image}`}
                            title={newsDetail.title}
                            sx={{
                                borderRadius: "8px",
                                width: "100px",
                                height: "100px",
                                mt: 2
                            }}
                        />
                    )}
                    <Typography variant="body1" mt={2}>{newsDetail.content}</Typography>
                </CardContent>
            </Card>
        </Container>
        </>
    );
};

export default NewsDetail;
