import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {Card, CardContent, Container, Typography, Alert, CardMedia} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { getNewsById } from "../../slices/newsSlice/newsSlice.tsx";
import axiosAPI from "../../axiosAPI.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import Comments from "../../components/Comments/Comments.tsx";
import dayjs from 'dayjs';

const NewsDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { newsDetail, isLoading, error } = useAppSelector((state) => state.newsList);

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


    return (
        <>
            <Container>
            <Card
                sx={{
                    minWidth: 275,
                    border: "3px solid",
                    borderRadius: "10px",
                    marginTop: 2,
                    p: 2
                }}
            >
                <CardContent>
                    <Typography variant="h4" gutterBottom>{newsDetail.title}</Typography>
                    {newsDetail.imageDate && (
                        <Typography color="textSecondary"> {dayjs(newsDetail.imageDate).format('dddd, MMMM D, YYYY')}</Typography>
                    )}
                    {newsDetail.image ? (
                        <CardMedia
                            component="img"
                            src={`${axiosAPI.defaults.baseURL}${newsDetail.image}`}
                            title={newsDetail.title}
                            sx={{
                                borderRadius: "8px",
                                width: "100px",
                                height: "100px",
                                mt: 2
                            }}
                        />
                    ) : (
                        <Typography variant="body2" color="textSecondary" mt={2}>No Image Available</Typography>
                    )}
                    <Typography variant="body1" mt={2}>{newsDetail.content}</Typography>
                </CardContent>
                <hr/>
                <Comments newsId={newsDetail.id!}/>
            </Card>
        </Container>
        </>
    );
};

export default NewsDetail;
