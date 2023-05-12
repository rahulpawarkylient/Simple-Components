import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, IconButton, TextField, FormLabel } from "@mui/material";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { Circle } from "styled-spinkit";
import Backdrop from '@mui/material/Backdrop';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function NewBlogEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const blogData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:8080/api/blog/viewblog/${id}`);
                const { title, description } = response.data;
                setTitle(title);
                setDescription(description);
                setIsLoading(false);
            } catch (error) { 
                console.error(error);
                setIsLoading(false);
            }
        };
        blogData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('description', description);

            const response = await axios.put(
                `http://localhost:8080/api/blog/updateblog/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response.data);
            navigate("/blog");

        } catch (error) {
            console.error(error);
        }
    }

    const handleBack = () => {
        navigate("/blog");
    }
    return (
        <>
            <Box m="20px">
                <Header title="EDIT BLOG" subtitle="Edit Blog" />
                <Tooltip title="Back" arrow>
                    <IconButton onClick={handleBack}>
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <Box
                    display="flex"
                    minHeight="60vh"
                    maxWidth="55vh"
                    ml="50vh"
                >
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Title"
                                name="title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                sx={{ gridColumn: "span 12" }}
                            />
                            <TextField
                                fullWidth
                                id="filled-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                variant="filled"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                sx={{ gridColumn: "span 12" }}
                            />

                            <Box
                                display="flex"
                                sx={{
                                    alignItems: "center",
                                    marginTop: "1rem",
                                    width: "400px"
                                }}
                            >
                                <FormLabel
                                    htmlFor="upload-input"
                                    sx={{ marginRight: "30px" }}
                                >
                                    <Button
                                        variant="contained"
                                        color="success"
                                        component="label"
                                        startIcon={image ? <CheckCircleIcon /> : <AddCircleIcon />}
                                    >
                                        Add Image
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(event) => setImage(event.target.files[0])}
                                        />
                                    </Button>
                                </FormLabel>
                                {image && (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="..."
                                            width="100px"
                                            height="50px"
                                            style={{ borderRadius: "5px", marginRight: "10px" }}
                                        />
                                    </Box>
                                )}

                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="end" marginTop="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Edit Product
                            </Button>
                        </Box>
                    </form>
                </Box >
            </Box >
            <Backdrop
                sx={{ color: "aliceblue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <Circle color={"#fafafa"} size={50} />
            </Backdrop>
        </>
    )
}

export default NewBlogEdit
