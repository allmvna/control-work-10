import Grid from "@mui/material/Grid2";
import {Alert, Button, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Loader from "../../UI/Loader/Loader.tsx";
import {deleteNews, getNews} from "../../slices/newsSlice/newsSlice.tsx";
import axiosAPI from "../../axiosAPI.ts";
import {Delete, ReadMore} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import dayjs from 'dayjs';

const NewsList = () => {
    const { news, isLoading, error } = useAppSelector((state) => state.newsList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    return (
        <>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        News
                    </Typography>
                    <Button to="/add" component={NavLink} variant="contained" sx={{ backgroundColor: "#001f3d" }}>
                        Add New Post
                    </Button>
                </Grid>
            </Grid>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">There is no data. Please try again later!</Alert>
            ) : news.length === 0 ? (
                <Alert severity="info">No news available at the moment.</Alert>
            ) : (
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    {news.map((n) => (
                        <Grid size={12} key={n.id}>
                            <Card
                                sx={{
                                    minWidth: 275,
                                    border: "3px solid",
                                    borderRadius: "10px",
                                }}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    {n.image && (
                                        <Grid sx={{ pr: 2 }}>
                                            <CardMedia
                                                component="img"
                                                src={`${axiosAPI.defaults.baseURL}${n.image}`}
                                                title={n.title}
                                                sx={{
                                                    borderRadius: "8px",
                                                    width: "100px",
                                                    height: "100px",
                                                }}
                                            />
                                        </Grid>
                                    )}

                                    <Grid sx={{ flexGrow: 1 }}>
                                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                                            <strong style={{ color: "red" }}>Title: </strong> {n.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: 18 }}>
                                            <strong style={{ color: "blue" }}>Date publication:</strong> "{dayjs(n.imageDate).format('dddd, MMMM D, YYYY')}"
                                        </Typography>
                                    </Grid>

                                    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                                        <Button
                                            variant='contained'
                                            to={`/news/${n.id}`}
                                            component={NavLink}
                                        >
                                            {isLoading ? <CircularProgress size={24} /> : <ReadMore/>}
                                        </Button>
                                        <Button variant='contained'
                                                sx={{
                                                    backgroundColor: "red",
                                                }}
                                                onClick={() => dispatch(deleteNews(n.id!))}
                                        >
                                            {isLoading ? <CircularProgress size={24} /> : <Delete/>}
                                        </Button>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default NewsList;
