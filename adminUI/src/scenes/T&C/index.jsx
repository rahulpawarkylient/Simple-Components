import { Backdrop, Box, Button, TextField, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../../components/Header";
import axios from "axios";
import { tokens } from "../../theme";
import { Circle } from "styled-spinkit";

const TermsAndConditions = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchTandCData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:8080/api/T&C/getT&C"
        );
        const { _id, title, description } = response.data[0];
        setId(_id);
        setTitle(title);
        setDescription(description);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchTandCData();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:8080/api/T&C/updateT&C/${id}`, {
        title,
        description,
      });
      console.log("Update successful");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["blockquote", "code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "indent",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  return (
    <>
      <Box m="20px">
        <Header title="Terms And Conditions" subtitle="Manage T&C" />
        <Box
          mt="5px"
          p="5 5px"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          backgroundColor={colors.primary[400]}
          sx={{
            width: 750,
            height: 420,
            ml: "100px",
            boxShadow: 3,
            borderRadius: "10px",
          }}
        >
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
              type="text"
              label="Enter Your Title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
              required
            />
            <Box sx={{ height: 270, overflowY: "auto", width: "100%" }}>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={handleDescriptionChange}
                modules={modules}
                formats={formats}
              />
            </Box>
              <br />
            <Button variant="contained" type="submit" color="primary" >
              Update
            </Button>
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
  );
};

export default TermsAndConditions;
