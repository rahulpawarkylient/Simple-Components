import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const NewNotifyForm = ({ handleClose }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/notify/add",
        {
          title,
          message,
        }
      );

      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
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
          type="title"
          label="Title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="message"
          label="Message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
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
            Add Notification
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewNotifyForm;
