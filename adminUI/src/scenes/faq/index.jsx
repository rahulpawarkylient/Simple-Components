import { Box, Button, useTheme, IconButton, Backdrop } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import NewFaqModel from "../../components/FaqModel/NewFaqModel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Circle } from "styled-spinkit";

const FAQ = () => {
  const [addFaqDialogOpen, setAddFaqDialogOpen] = useState(false);
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleAddFaqDialogOpen = () => {
    setAddFaqDialogOpen(true);
  };

  const handleAddFaqDialogClose = () => {
    setAddFaqDialogOpen(false);
    fetchFaqData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you Confirm You want to delete this FAQ..."))
      try {
        await axios.delete(`http://localhost:8080/api/faq/deleteFaq/${id}`);
        setFaqData(faqData.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

  const fetchFaqData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(" http://localhost:8080/api/faq/getFaq");
      setFaqData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      <Box mb="15px">
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          color="primary"
          onClick={handleAddFaqDialogOpen}
        >
          Add New FAQ
        </Button>
        <NewFaqModel
          open={addFaqDialogOpen}
          handleClose={handleAddFaqDialogClose}
        />
      </Box>
      {faqData.map((item) => (
        <Accordion key={item._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {item.question}
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <IconButton onClick={() => handleDelete(item._id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Backdrop
        sx={{ color: "aliceblue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <Circle color={"#fafafa"} size={50} />
      </Backdrop>
    </Box>
  );
};

export default FAQ;
