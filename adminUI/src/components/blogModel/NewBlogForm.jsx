import {
    Button,
    TextField,
    Box,
} from "@mui/material";
import { useState } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from "axios";


const NewBlogForm = ({ handleClose }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');


    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);


    const validateForm = () => {
        let isValid = true;
        if (title === "") {
            setTitleError(true);
            isValid = false;
        } else {
            setTitleError(false);
        }

        if (description === "") {
            setDescriptionError(true);
            isValid = false;
        } else {
            setDescriptionError(false);
        }

        return isValid;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('title', title);
                formData.append('description', description);

                const response = await axios.post(
                    'http://localhost:8080/api/blog/addblog',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(response.data);
                handleClose();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem",
                }}
            >
                <TextField
                    fullWidth
                    variant="filled"
                    type="title"
                    label="Title"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
                    error={titleError}
                    helperText={titleError && "Please enter a valid Title"}
                />

                <Button
                    variant="contained"
                    color="secondary"
                    component="label"
                    sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}

                >
                    <FileUploadIcon />
                    Upload Image
                    <input
                        type="file"
                        hidden
                        display="inlineBlock"
                        onChange={(event) => setImage(event.target.files[0])}
                    />
                </Button>
                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
                    error={descriptionError}
                    helperText={descriptionError && "Please enter a Description"}
                />

                <Box>
                    <Button
                        variant="contained"
                        sx={{ margin: "1em" }}
                        color="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        sx={{ margin: "1rem" }}
                    >
                        Add Blog
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default NewBlogForm;
