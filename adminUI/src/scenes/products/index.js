import React from "react";
import Header from "../../components/Header";
import { Box, IconButton, Button, useTheme } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Circle } from "styled-spinkit";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";
import { Link } from "react-router-dom";
import NewProductModel from "../../components/productModel/NewProductModel";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [addProductDialogOpen, setAddDialogOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductData();
  }, []);

  const onDeleteProduct = async (product_id) => {
    if (window.confirm("Are you sure You want to delete this user....")) {
      const response = await axios.delete(
        `http://localhost:8080/api/product/deleteproduct/${product_id}`
      );
      if (response.status === 200) {
        // console.log("response.data", response.data);
        fetchProductData();
      }
    }
  };

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/product/viewproduct"
      );
      setProductData(response.data);
      setIsLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleAddProductDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddProductDialogClose = () => {
    setAddDialogOpen(false);
    fetchProductData();
  };

  const ProductData = [];

  const columns = [
    { field: "serial_no", headerName: "S.NO", flex: 0.2 },
    {
      field: "image",
      headerName: "Product",
      flex: 0.8,
      width: 150,
      renderCell: (product) => (
        <div style={{ height: "100px", display: "flex", alignItems: "center" }}>
          <img
            src={`http://localhost:8080/${product.row.image}`} // If you are upload image from your file manager
            // src={product.row.image} // If you are Upload Image URL then it will Work
            alt="Product"
            style={{ width: "90px", height: "45px", borderRadius: "5px" }}
          />
        </div>
      ),
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.5,
    },
    {
      field: "subcategory",
      headerName: "Sub Category",
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "option",
      headerName: "Option",
      flex: 0.6,
      renderCell: ({ row: { product_id } }) => {
        return (
          <>
            <Link to={`/products/newviewproduct/${product_id}`}>
              <IconButton>
                <VisibilityIcon />
              </IconButton>
            </Link>

            <Link to={`/products/neweditproduct/${product_id}`}>
              <IconButton>
                <BorderColorIcon />
              </IconButton>
            </Link>

            <Link to="#" onClick={() => onDeleteProduct(product_id)}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box m="20px">
        <Box>
          <Header title="PRODUCTS" subtitle="Managing the Products" />
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            color="primary"
            onClick={handleAddProductDialogOpen}
          >
            Add a New Product
          </Button>
          <NewProductModel
            open={addProductDialogOpen}
            handleClose={handleAddProductDialogClose}
          />
        </Box>
        <Box
          m="30px 0 0 0"
          height="60vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          {productData.map((product, index) => {
            var innerObj = {};
            innerObj["serial_no"] = index + 1;
            innerObj["image"] = product.image;
            innerObj["productName"] = product.productName;
            innerObj["price"] = "₹" + product.price; // concatenate Rupee symbol
            innerObj["category"] = product.category;
            innerObj["subcategory"] = product.subcategory;
            innerObj["product_id"] = product._id;
            innerObj["description"] = product.description;
            ProductData.push(innerObj);
            return null;
          })}
          <DataGrid
            rows={ProductData}
            columns={columns}
            getRowId={(row) => row.product_id}
          />
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "aliceblue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <Circle color={"#fafafa"} size={50} />
      </Backdrop>
    </>
  );
};

export default Products;
