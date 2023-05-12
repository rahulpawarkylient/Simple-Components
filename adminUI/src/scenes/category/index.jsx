import React, { useState } from "react";
import { Box, useTheme, TextField, Button, IconButton } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Category() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/category", {
        category: category,
      });
      console.log(response.data); // Handle success response
      setCategory("");
      fetchCategoryData();
    } catch (error) {
      console.error(error); // Handle error response
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/category");
      setCategoryData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCategory = async (category_id) => {
    if (window.confirm("Are you sure You want to delete this user...."))
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/category/${category_id}`
        );
        if (response.status === 200) {
          // console.log("response.data", response.data);
          fetchCategoryData();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(error.response.data);
        } else {
          console.error(error);
          alert("Failed to delete category. Please try again later");
        }
      }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const mockCategoryData = [];

  const columns = [
    { field: "serial_no", headerName: "S.NO", flex: 0.3 },

    {
      field: "category",
      headerName: "Category Name",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "Updated Date",
      flex: 1,
    },
    {
      field: "option",
      headerName: "Option",
      flex: 0.5,
      renderCell: ({ row: { category_id } }) => {
        return (
          <>
            <Link to="#" onClick={() => onDeleteCategory(category_id)}>
              <Tooltip title="Delete" arrow>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
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
          <Header title="Category" subtitle=" Manage Category" />
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
                label="Category Name"
                name="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                sx={{ gridColumn: "span 2" }}
              />

              <Button
                variant="contained"
                size="small"
                type="submit"
                startIcon={<AddCircleIcon />}
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
          <Box
            m="20px 0 0 0"
            height="58vh"
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
            {categoryData.map((category, index) => {
              var innerObj = {};
              innerObj["serial_no"] = index + 1;
              innerObj["category_id"] = category._id;
              innerObj["category"] = category.category;
              innerObj["createdAt"] = category.createdAt;
              innerObj["updatedAt"] = category.updatedAt;
              mockCategoryData.push(innerObj);
              return null;
            })}
            <DataGrid
              rows={mockCategoryData}
              columns={columns}
              getRowId={(row) => row.category_id}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Category;
