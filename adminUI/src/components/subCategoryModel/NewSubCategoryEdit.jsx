import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const NewSubCategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchSubCategoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/sub-category/${id}`
        );
        const { subcategory, description, category } = response.data;
        setSubCategory(subcategory);
        setDescription(description);
        setCategory(category);
        console.log(category);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubCategoryData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { subcategory, description };
    try {
      const response = await axios.put(
        `http://localhost:8080/api/sub-category/${category}/${id}`,
        data
      );
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  const handleBack = async () => {
    navigate("/subcategory");
  };
  return (
    <>
      <Box m="20px">
        <Header title="EDIT CATEGORY" subtitle="Edit Sub Category" />
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box display="flex" minHeight="60vh" maxWidth="55vh" ml="50vh">
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
                value={subcategory}
                onChange={(event) => setSubCategory(event.target.value)}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                name="productName"
                InputLabelProps={{ shrink: true }}
                sx={{ gridColumn: "span 12" }}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Edit Product
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      {/* <Backdrop
        sx={{ color: "aliceblue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
    >
        <Circle color={"#fafafa"} size={50} />
    </Backdrop> */}
    </>
  );
};

export default NewSubCategoryEdit;
