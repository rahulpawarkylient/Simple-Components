import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  IconButton,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SubCategory() {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);

  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubCategoryData] = useState([]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/subcategory/${categoryId}`);
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/category");
      setCategoryData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //SubCategory
  const fetchSubCategoryData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sub-category"
      );
      setSubCategoryData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Delete SubCategory
  const onDeleteSubCategory = async (category, subcategory_id) => {
    console.log("subcategory_id", subcategory_id);
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/sub-category/${category}/${subcategory_id}`
        );
        if (response.status === 200) {
          fetchSubCategoryData();
        } else {
          alert("Failed to delete subcategory");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to delete subcategory");
      }
    }
  };

  useEffect(() => {
    fetchCategoryData();
    fetchSubCategoryData();
  }, []);

  const mockSubCategoryData = [];

  const columns = [
    { field: "serial_no", headerName: "S.NO", flex: 0.3 },

    {
      field: "subcategory",
      headerName: "Sub Category Name",
      flex: 1,
    },

    {
      field: "description",
      headerName: "description",
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
      renderCell: ({ row: { category, subcategory_id } }) => {
        return (
          <>
            <Link to={`/subcategory/edit/${subcategory_id}`}>
              <Tooltip title="Edit" arrow>
                <IconButton>
                  <BorderColorIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link
              to="#"
              onClick={() => onDeleteSubCategory(category, subcategory_id)}
            >
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
          <Header title="Sub Category" subtitle=" Manage Sub Category" />

          <Box
            sx={{ width: 600 }}
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(5, minmax(0, 1fr))"
          >
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={categoryData}
                onChange={(event) => setCategoryData(event.target.value)}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categoryData.map((category) => (
                  // <Link to={`/subcategory/${category._id}`}>
                  <MenuItem
                    key={category._id}
                    value={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                  >
                    {category.category ?? "Unnamed category"}
                  </MenuItem>
                  // </Link>
                ))}
              </Select>
            </FormControl>
          </Box>
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
            {subcategoryData.map((subcategory, index) => {
              var innerObj = {};
              innerObj["serial_no"] = index + 1;
              innerObj["subcategory_id"] = subcategory._id;
              innerObj["category"] = subcategory.category._id;
              innerObj["subcategory"] = subcategory.subcategory;
              innerObj["description"] = subcategory.description;
              innerObj["createdAt"] = subcategory.createdAt;
              innerObj["updatedAt"] = subcategory.updatedAt;
              mockSubCategoryData.push(innerObj);
              return null;
            })}
            <DataGrid
              rows={mockSubCategoryData}
              columns={columns}
              getRowId={(row) => row.subcategory_id}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SubCategory;
