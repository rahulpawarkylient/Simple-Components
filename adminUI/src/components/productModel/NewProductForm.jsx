import {
  Button,
  TextField,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const NewProductForm = ({ handleClose }) => {
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubCategoryData] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");

  const [productNameError, setProductNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const validateForm = () => {
    let isValid = true;
    if (productName === "") {
      setProductNameError(true);
      isValid = false;
    } else {
      setProductNameError(false);
    }
    if (price === "") {
      setPriceError(true);
      isValid = false;
    } else {
      setPriceError(false);
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
        formData.append("image", image);
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("category", selectedCategory);
        formData.append("subcategory", selectedSubcategory);
        formData.append("description", description);

        const response = await axios.post(
          "http://localhost:8080/api/product/addproduct",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
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

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/category");
      setCategoryData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubCategoryData = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/sub-category?category=${categoryId}`
      );
      setSubCategoryData(response.data);
      setSelectedSubcategory("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    fetchSubCategoryData(categoryId);
  };

  const handleSubcategoryChange = (event) => {
    const subcategoryId = event.target.value;
    setSelectedSubcategory(subcategoryId);
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
          type="productName"
          label="Product Name"
          name="productName"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
          error={productNameError}
          helperText={productNameError && "Please enter a valid Product Name"}
        />
        <TextField
          fullWidth
          variant="filled"
          type="price"
          label="Price"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
          error={priceError}
          helperText={priceError && "Please enter a Price"}
        />

        <Box>
          <FormControl variant="standard" sx={{ minWidth: 80, mr: 10 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Role"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categoryData.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.category ?? "Unnamed category"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
          <FormControl variant="standard" sx={{ minWidth: 100 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Sub-Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Role"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              disabled={!selectedCategory}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {subcategoryData.map((subcategory) => (
                <MenuItem key={subcategory._id} value={subcategory._id}>
                  {subcategory.subcategory ?? "Unnamed category"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Box>

        <FormLabel sx={{ margin: "1rem", width: "300px" }}>
          <Button
            variant="contained"
            color="success"
            component="label"
            style={{ marginRight: "1rem" }}
            startIcon={image? <CheckCircleIcon/> :<AddCircleIcon/> }
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(event) => setImage(event.target.files[0])}
            />
          </Button>
        </FormLabel>

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
          helperText={descriptionError && "Please enter a valid Product Name"}
        />

        <div>
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
            Add Product
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewProductForm;
