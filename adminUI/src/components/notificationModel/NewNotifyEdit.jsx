import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, IconButton, TextField } from "@mui/material";
import Header from "../../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Circle } from "styled-spinkit";
import Backdrop from "@mui/material/Backdrop";

const NewNotifyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const notifyData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/notify/${id}`
        );
        const { title, message } = response.data;
        setTitle(title);
        setMessage(message);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    notifyData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:8080/api/notify/${id}`, {
        title,
        message,
      });
      setIsLoading(false);
      navigate("/notify");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/notify");
  };
  return (
    <>
      <Box m="20px">
        <Header title="EDIT PRODUCTS" subtitle="Edit Product" />
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
                label="Title"
                name="title"
                InputLabelProps={{ shrink: true }}
                sx={{ gridColumn: "span 12" }}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Message"
                name="message"
                InputLabelProps={{ shrink: true }}
                sx={{ gridColumn: "span 12" }}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Edit Message
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
  );
};

export default NewNotifyEdit;
