import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Header from "../../components/Header";

const LoginForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await axios.post("http://localhost:8080/api/login", values);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            } else {
                setFieldError("email", "Invalid email or password.");
            }
        } catch (error) {
            setFieldError("email", "Invalid Credantials");
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
    });

    return (
        <main className="content">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Header title="Login" subtitle="" />

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            >
                                <Field
                                    as={TextField}
                                    fullWidth
                                    variant="filled"
                                    type="email"
                                    label="Email"
                                    name="email"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 12" }}
                                />

                                <Field
                                    as={TextField}
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Password"
                                    name="password"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 12" }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="center" mt="20px">
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isSubmitting}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </main>
    );
};

export default LoginForm;