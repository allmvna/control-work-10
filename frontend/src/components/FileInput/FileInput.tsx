import React, {useRef, useState} from 'react';
import Grid from "@mui/material/Grid2";
import { Button, TextField } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
}


const FileInput: React.FC<Props> = ({onChange, name, label}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState('');
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFilename(e.target.files[0].name);
        } else {
            setFilename('');
        }
        onChange(e);
    };

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <>
            <input
                style={{display: 'none'}}
                type="file"
                name={name}
                onChange={onFileChange}
                ref={inputRef}
            />
            <Grid container direction="row" spacing={1} alignItems="center">
                <Grid size={10}>
                    <TextField
                        disabled
                        label={label}
                        value={filename}
                        onClick={activateInput}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid size={2}>
                    <Button
                        sx={{
                            borderColor: "black",
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'gray',
                                color: 'white'
                            }
                    }}
                        size="large"
                        variant="outlined"
                        onClick={activateInput}
                    >
                        <FileDownloadIcon/>
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};


export default FileInput;


