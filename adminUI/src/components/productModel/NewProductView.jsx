import React, { useState, useEffect } from 'react';
import { Box, IconButton, useTheme, Typography, Backdrop } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Circle } from 'styled-spinkit';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import Tooltip from '@mui/material/Tooltip';


function NewProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:8080/api/product/viewoneproduct/${id}`);
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        getProduct();
    }, [id]);


    const handleBack = () => {
        navigate('/products');
    };

    return (
        <>
            <Box m="20px">
                <Header title="VIEW PRODUCTS" subtitle="View Product" />
                <Tooltip title="Back" arrow>
                    <IconButton onClick={handleBack}>
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <Box
                    mt="5px"
                    p="5px"
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    backgroundColor={colors.primary[400]}
                    sx={{
                        width: "80%",
                        maxWidth: 1200,
                        margin: "0 auto",
                        boxShadow: 4,
                        borderRadius: "10px",
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 350,
                            width: "60%",
                            maxWidth: 600,
                            borderRadius: "5px",
                        }}
                        alt="..."
                        src={`http://localhost:8080/${product.image}`}
                    />
                    <Box
                        sx={{
                            textAlign: "center",
                            padding: "10px",
                            width: "40%",
                            maxWidth: 600,
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="600"
                            color={colors.grey[100]}
                            sx={{ textDecoration: 'underline' }}

                        >
                            {product.productName}
                        </Typography>
                        <Typography
                            variant="h2"
                            fontWeight="bold"
                            color={colors.greenAccent[500]}
                        >
                            ₹{product.price}
                        </Typography>
                        <Typography
                            variant="body1"
                            fontWeight="regular"
                            color={colors.greenAccent[100]}
                            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                        >
                            {product.description}
                        </Typography>
                    </Box>
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

export default NewProductView;
