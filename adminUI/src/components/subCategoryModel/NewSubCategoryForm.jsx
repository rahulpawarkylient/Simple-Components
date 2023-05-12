import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const NewSubCategoryForm = () => {
  const { id } = useParams();
  const [subcategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCatogery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/sub-category/${id}`,
        {
          subcategory: subcategory,
          description: description,
        }
      );
      console.log(response.data); // Handle success response
      setSubCategory("");
      setDescription("");
      navigate("/subcategory");
    } catch (error) {
      console.error(error); // Handle error response
    }
  };

  useEffect(()=>{
    const getCategory = async ()=>{
        try {
            const {data} = await axios.get(`http://localhost:8080/api/category/${id}`);
            setCatogery(data)
        }catch (error) {
            console.log(error)
        }
    }
    getCategory()
  },[id])
  return (
    <>
      <Box m="20px">
        <Box>
          <Header title="Add Sub-Category" subtitle={category.category} />
          <form onSubmit={handleSubmit}>
            <Box
              sx={{ width: 600 }}
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(5, minmax(0, 1fr))"
            >
              <TextField
                variant="filled"
                type="text"
                label="Sub Category Name"
                name="subcategory"
                value={subcategory}
                onChange={(event) => setSubCategory(event.target.value)}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                sx={{ gridColumn: "span 2" }}
              />
              <Button
                variant="contained"
                size="small"
                type="submit"
                sx={{
                  height: "35px",
                  width: "80px",
                  marginTop: "10px",
                  // backgroundColor: "#70d8bd"
                }}
              >
                ADD
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default NewSubCategoryForm;
