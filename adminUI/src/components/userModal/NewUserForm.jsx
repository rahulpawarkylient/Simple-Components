import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const NewUserForm = ({ handleClose }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [role, setRole] = useState();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  // const [status, setStatus] = useState();

  const validateForm = () => {
    let isValid = true;
    if (name === "") {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }
    if (email === "" || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }
    if (password === "" || password.length < 8) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }
    if (mobile === "" || mobile.length !== 10) {
      setMobileError(true);
      isValid = false;
    } else {
      setMobileError(false);
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/register",
          {
            name: name,
            email: email,
            gender: gender,
            password: password,
            mobile: mobile,
            role: role,
          }
        );
        console.log(response.data);
        handleClose();
      } catch (error) {
        console.error(error);
      }
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
          type="text"
          label="Name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
          error={nameError}
          helperText={nameError && "Please enter a valid name"}
        />
        <TextField
          fullWidth
          variant="filled"
          type="email"
          label="Email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
          error={emailError}
          helperText={emailError && "Please enter a valid email address"}
        />
        <TextField
          fullWidth
          variant="filled"
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
          error={passwordError}
          helperText={passwordError && "Please enter a valid password"}
        />
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Number"
          name="number"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          sx={{ gridColumn: "span 12", margin: "1rem", width: "300px" }}
          error={mobileError}
          helperText={mobileError && "Please enter a valid mobile"}
        />
        <Box sx={{ flexDirection: "row" }}>
          <FormControl variant="standard" sx={{ minWidth: 80 }}>
            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>{" "}
          &nbsp;
          {/* <FormControl variant="standard" sx={{ minWidth: 130 }}>
                  <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                  <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Status"
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                  >
                      <MenuItem value="">
                          <em>None</em>
                      </MenuItem>
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
              </FormControl> */}
          <FormControl variant="standard" sx={{ minWidth: 80 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Gender
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Status"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
            Add User
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewUserForm;
