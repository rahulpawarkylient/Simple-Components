import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NewNotifyModel from "../../components/notificationModel/NewNotifyModel";
import { Link } from "react-router-dom";

const Notification = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [notifyData, setNotifyData] = useState([]);
  const [addNotifyDialogOpen, setAddDialogOpen] = useState(false);

  const fetchNotifyData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/notify");
      setNotifyData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifyData();
  }, []);

  const deleteNotify = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/notify/${_id}`
      );
      console.log(response.data); // log the response data for debugging
      fetchNotifyData(); // fetch updated data after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNotifyDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddNotifyDialogClose = () => {
    setAddDialogOpen(false);
    fetchNotifyData();
  };

  return (
    <>
      <Box m="20px">
        <Box>
          <Header title="Notification" subtitle="Managing the messages" />
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            color="primary"
            onClick={handleAddNotifyDialogOpen}
          >
            Add a New Message
          </Button>
          <NewNotifyModel
            open={addNotifyDialogOpen}
            handleClose={handleAddNotifyDialogClose}
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
          <DataGrid
            columns={[
              { field: "id", headerName: "ID", flex: 0.3 },
              {
                field: "title",
                headerName: "Title Name",
                flex: 1,
              },
              {
                field: "message",
                headerName: "Message",
                flex: 0.5,
              },
              {
                field: "actions",
                headerName: "Actions",
                flex: 0.5,
                renderCell: (params) => (
                  <>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteNotify(params.row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Link to={`/notify/edit/${params.row._id}`}>
                      <IconButton aria-label="edit">
                        <BorderColorIcon />
                      </IconButton>
                    </Link>
                  </>
                ),
              },
            ]}
            rows={notifyData.map((data, index) => ({
              ...data,
              _id: data._id,
              id: index + 1,
            }))}
          />
        </Box>
      </Box>
    </>
  );
};

export default Notification;
