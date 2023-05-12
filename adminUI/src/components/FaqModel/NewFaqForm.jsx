import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const NewFaqForm = ({ handleClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to the API endpoint with the form data
       await axios.post(
        "http://localhost:8080/api/faq/faq-create",
        {
          question,
          answer,
        }
      );

      // If the request is successful, close the form
      handleClose();
    } catch (error) {
      console.log(error);
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
          type="Question"
          label="Enter Your Question"
          name="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
          required
        />
        <TextField
          fullWidth
          variant="filled"
          type="Answer"
          label="Answer"
          name="answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
          required
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
            Add FAQ
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewFaqForm;
