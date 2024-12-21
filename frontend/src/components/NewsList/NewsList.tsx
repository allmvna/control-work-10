import Grid from "@mui/material/Grid2";
import {Alert, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Loader from "../../UI/Loader/Loader.tsx";
import {getNews} from "../../slices/newsSlice/newsSlice.tsx";
import axiosAPI from "../../axiosAPI.ts";

const NewsList = () => {
    const { news, isLoading, error } = useAppSelector((state) => state.list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">There is no data. Please try again later!</Alert>
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
                                                src={axiosAPI + `${n.image}`}
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
                                            <strong style={{ color: "blue" }}>Date publication:</strong> "{n.imageDate}"
                                        </Typography>
                                    </Grid>

                                    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                                        <Button variant='contained'>Read more...</Button>
                                        <Button variant='contained'>Delete</Button>
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
