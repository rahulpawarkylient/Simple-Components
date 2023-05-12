import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, IconButton, TextField, FormLabel } from "@mui/material";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';
import { Circle } from "styled-spinkit";
import Backdrop from '@mui/material/Backdrop';


function NewProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const productData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:8080/api/product/viewoneproduct/${id}`);
                const { productName, price } = response.data;
                setProductName(productName);
                setPrice(price);
                setIsLoading(false);

            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        productData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('image', image);
            formData.append('productName', productName);
            formData.append('price', price);

            const response = await axios.put(
                `http://localhost:8080/api/product/editproduct/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response.data);
            setIsLoading(false);
            navigate("/products");

        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    const handleBack = () => {
        navigate("/products");
    }
    return (
        <>
            <Box m="20px">
                <Header title="EDIT PRODUCTS" subtitle="Edit Product" />
                <IconButton onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
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
                                label="Product Name"
                                name="productName"
                                InputLabelProps={{ shrink: true }}
                                sx={{ gridColumn: "span 12" }}
                                value={productName}
                                onChange={(event) => setProductName(event.target.value)}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Price"
                                name="price"
                                InputLabelProps={{ shrink: true }}
                                sx={{ gridColumn: "span 12" }}
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                            />
                            <FormLabel htmlFor='upload-input'
                             sx={{ margin: "1rem", width: "300px" }}>

                                <Button
                                    variant="contained"
                                    color={image ? "success" : "error"}
                                    component="label"
                                    style={{ marginRight: "1rem" }}
                                >
                                    <FileUploadIcon />Upload Product
                                    <input
                                        type="file"
                                        hidden
                                        accept='image/*'
                                        onChange={(event) => setImage(event.target.files[0])}
                                    />
                                </Button>
                            </FormLabel>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Edit Product
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
            <Backdrop
                sx={{ color: "aliceblue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <Circle color={"#fafafa"} size={50} />
            </Backdrop>
        </>
    )
}

export default NewProductEdit
