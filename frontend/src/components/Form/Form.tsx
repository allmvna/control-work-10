import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import FileInput from "../FileInput/FileInput.tsx";
import {sendNews} from "../../slices/newsSlice/newsSlice.tsx";


const initialState = {
    title: '',
    content: '',
    image: null
};

const Form = () => {
    const [formData, setFormData] = useState(initialState);
    const { isLoading } = useAppSelector((state) => state.newsList);
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            console.error("No file selected");
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            return;
        }

        try {
            await dispatch(sendNews(formData));
            setFormData(initialState);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mx: "auto",
                        width: "60%",
                        border: "3px solid #001f3d",
                        borderRadius: "10px",
                        p: 3,
                        mt: 3
                    }}
                >

                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            onChange={onChange}
                            value={formData.title}
                            id="title"
                            label="Title"
                            variant="outlined"
                            name="title"
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            onChange={onChange}
                            value={formData.content}
                            multiline
                            id="content"
                            label="Content"
                            variant="outlined"
                            name="content"
                            required
                        />
                    </Grid>
                    <Grid size={8}>
                        <FileInput
                            label="Image"
                            name="image"
                            onChange={fileInputChange}
                        />
                    </Grid>
                    <Grid size={12} textAlign='center'>
                        <Button
                            type='submit'
                            size='large'
                            variant="contained"
                            disabled={isLoading}
                            color="primary"
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default Form;