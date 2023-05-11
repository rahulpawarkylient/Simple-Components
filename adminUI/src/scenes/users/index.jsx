import {
  Box,
  IconButton,
  useTheme,
  Typography,
  InputBase,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { Circle } from "styled-spinkit";
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import NewUserModal from "../../components/userModal/NewUserModal";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/user",
});

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [addUserDialogOpen, setAddDialogOpen] = useState(false);
  const [statusUpdateLoading, setUpdateLoading] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    fetchTeamData(searchQuery);
  };

  useEffect(() => {
    fetchTeamData();
  },[searchQuery]);

  const fetchTeamData = async () => {
    try {
      const response = await axiosInstance.get(
        `/userAllget?search=${searchQuery}`
      );
      setTeamData(response.data);
      setIsLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleStatus = async (user_id, serial_no) => {
    try {
      const index = serial_no - 1;
      setUpdateLoading(user_id);
      const response = await axiosInstance.put(`/${user_id}/toggle-status`);
      console.log(response.data);
      setUpdateLoading("");
      teamData[index].status = !teamData[index].status;
      setTeamData(teamData);
    } catch (error) {
      setUpdateLoading("");
      console.error(error);
    }
  };

  const onDeleteUser = async (user_id) => {
    if (window.confirm("Are you sure You want to delete this user....")) {
      const response = await axios.delete(
        `http://localhost:8080/api/user/userDelete/${user_id}`
      );
      if (response.status === 200) {
        console.log("response.data", response.data);
        fetchTeamData();
      }
    }
  };

  const handleAddUserDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddUserDialogClose = () => {
    setAddDialogOpen(false);
    fetchTeamData();
  };

  // const handleEdit = (user_id) => {
  //   navigate(`/team/newedituser/${user_id}`);

  // }

  const mockTeamData = [];

  const columns = [
    { field: "serial_no", headerName: "S.NO", flex: 0.3 },
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { user_id, status, serial_no } }) => {
        return (
          <Button
            variant="contained"
            size="small"
            color={status ? "success" : "error"} // set the color based on the button's active state
            onClick={() => handleStatus(user_id, serial_no)}
          >
            {user_id === statusUpdateLoading ? (
              <CircularProgress size={20} />
            ) : status ? (
              "Active"
            ) : (
              "Inactive"
            )}
          </Button>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "manager"
                ? colors.greenAccent[800]
                : colors.greenAccent[900]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "option",
      headerName: "Option",
      flex: 1,
      renderCell: ({ row: { user_id } }) => {
        return (
          <>
            <Link to={`/users/newedituser/${user_id}`}>
              <IconButton>
                <BorderColorIcon />
              </IconButton>
            </Link>
            <Link to="#" onClick={() => onDeleteUser(user_id)}>
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
          <Header title="USER" subtitle="Managing the Team User" />
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            color="primary"
            onClick={handleAddUserDialogOpen}
          >
            Add a New User
          </Button>
          <NewUserModal
            open={addUserDialogOpen}
            color="primary"
            handleClose={handleAddUserDialogClose}
          />
        </Box>

        {/* Search Functionality */}
        <Box display="flex" justifyContent="end" p={2}>
          <Box
            display="flex"
            borderRadius="3px"
            backgroundColor={colors.primary[400]}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <IconButton type="button" sx={{ p: 1 }} onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          m="10px 0 0 0"
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
          {teamData.map((user, index) => {
            var innerObj = {};
            innerObj["serial_no"] = index + 1;
            innerObj["name"] = user.name;
            innerObj["email"] = user.email;
            innerObj["gender"] = user.gender;
            innerObj["mobile"] = user.mobile;
            innerObj["status"] = user.status;
            innerObj["role"] = user.role;
            innerObj["user_id"] = user._id;
            mockTeamData.push(innerObj);
            return null;
          })}
          <DataGrid
            rows={mockTeamData}
            columns={columns}
            getRowId={(row) => row.email}
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

export default Users;
