import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, TextField } from "@mui/material";
import Header from "../../components/Header";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Circle } from "styled-spinkit";
import Backdrop from '@mui/material/Backdrop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function NewEditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [gender, setGender] = useState();
    const [role, setRole] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/user/${id}`);
                const { name, email, mobile, gender, role } = response.data;
                setName(name);
                setEmail(email);
                setMobile(mobile);
                setGender(gender);
                setRole(role);
                setIsLoading(false);

            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    //Update Api Call
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = { name, email, mobile, gender, role };

        try {
            const response = await axios.put(`http://localhost:8080/api/user/userUpdate/${id}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            navigate("/users");
        } catch (error) {
            console.error(error);
        }
    };
    const handleBack = () => {
        navigate("/users");
    }

    return (
        <>
            <Box m="20px">
                <Header title="EDIT USER DETAILS" subtitle="Edit User Profile" />
                <IconButton onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="60vh"
                >
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
                                label="Name"
                                name="name"
                                InputLabelProps={{ shrink: true }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ gridColumn: "span 6" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                name="email"
                                InputLabelProps={{ shrink: true }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ gridColumn: "span 6" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Mobile Number"
                                name="mobile"
                                InputLabelProps={{ shrink: true }}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                sx={{ gridColumn: "span 6" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Role"
                                name="role"
                                InputLabelProps={{ shrink: true }}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Gender"
                                name="gender"
                                InputLabelProps={{ shrink: true }}
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Edit User
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
    )
}

export default NewEditUser;
