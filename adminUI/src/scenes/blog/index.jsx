import React, { useEffect } from 'react';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Box, useTheme, Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NewBlogModel from '../../components/blogModel/NewBlogModel';
import { Link } from 'react-router-dom';
import { Circle } from "styled-spinkit";
import Backdrop from '@mui/material/Backdrop';


const Blog = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isLoading, setIsLoading] = useState(true);

    const [addBlogDialogOpen, setAddDialogOpen] = useState(false);
    const [blogData, setBlogData] = useState([]);


    useEffect(() => {
        fetchBlogData();
    }, []);


    const fetchBlogData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:8080/api/blog/viewblog');
            setBlogData(response.data);
            // console.log(response.data);
            setIsLoading(false);

        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const onDeleteBlog = async (blog_id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/blog/deleteblog/${blog_id}`);
                if (response.status === 200) {
                    console.log('Blog deleted successfully');
                    fetchBlogData();
                } else {
                    console.error('Failed to delete blog');
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };


    const handleAddBlogDialogOpen = () => {
        setAddDialogOpen(true);
    };

    const handleAddBlogDialogClose = () => {
        setAddDialogOpen(false);
        fetchBlogData();
    };

    const BlogData = [];

    const columns = [
        {
            field: "serial_no", headerName: "S.NO", flex: 0.3,
        },
        {
            field: 'image',
            headerName: "Blog Image",
            flex: 0.8,
            width: 150,
            renderCell: (blog) => (
                <div style={{ height: '100px', display: 'flex', alignItems: 'center' }}>
                    <img
                        src={`http://localhost:8080/${blog.row.image}`}// If you are upload image from your file manager  
                        alt="Blog"
                        style={{ width: '90px', height: '45px', borderRadius: '5px' }}
                    />
                </div>
            ),
        },
        {
            field: "title",
            headerName: "Title",
            flex: 0.8,
        },
        {
            field: "description",
            headerName: "Description",
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
            flex: 0.6,
            renderCell: ({ row: { blog_id } }) => {
                return (
                    <>
                        <Link to={`/blog/neweditblog/${blog_id}`}>
                            <Tooltip title="Edit" arrow>
                                <IconButton>
                                    <BorderColorIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>

                        <Link to="#" onClick={() => onDeleteBlog(blog_id)}>
                            <Tooltip title="Delete" arrow>
                                <IconButton >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </>
                );
            },
        },
    ]



    return (
        <>
            <Box m="20px">
                <Header title="BLOG" subtitle="Managing the Blog" />
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    color="primary"
                    onClick={handleAddBlogDialogOpen}

                >
                    Add a New Blog
                </Button>
                <NewBlogModel
                    open={addBlogDialogOpen}
                    handleClose={handleAddBlogDialogClose}
                />
                <Box
                    m="20px 0 0 0"
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
                    {blogData.map((blog, index) => {
                        var innerObj = {};
                        innerObj["serial_no"] = index + 1;
                        innerObj["image"] = blog.image;
                        innerObj["title"] = blog.title;
                        innerObj["blog_id"] = blog._id;
                        innerObj["description"] = blog.description;
                        innerObj["createdAt"] = blog.createdAt;
                        innerObj["updatedAt"] = blog.updatedAt;
                        BlogData.push(innerObj);
                        return null;
                    })}
                    <DataGrid
                        rows={BlogData}
                        columns={columns}
                        getRowId={(row) => row.blog_id}
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
    )
}

export default Blog;
