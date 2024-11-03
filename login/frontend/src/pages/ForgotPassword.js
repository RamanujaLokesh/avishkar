import { React } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardContent } from "@mui/material";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const reg_no = data.get("reg_no"); // Get registration number
        const url = process.env.REACT_APP_BACKEND_URL + "/api/forgotPassword";
        
        try {
            const res = await axios.post(url, { reg_no: reg_no }); // Send reg_no to backend

            if (res.data.success === false) {
                toast.error(res.data.message, {
                    autoClose: 5000,
                    position: "top-right",
                });
            } else {
                toast.success(res.data.message, {
                    autoClose: 5000,
                    position: "top-right",
                });
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.", {
                autoClose: 5000,
                position: "top-right",
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Card sx={{ boxShadow: "4" }}>
                    <CardContent sx={{ m: 3 }}>
                        <Avatar sx={{
                            m: "auto",
                            bgcolor: "primary.main"
                        }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
                            Forgot Password
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="reg_no"
                                label="Registration Number"    // Changed label to Registration Number
                                name="reg_no"
                                autoComplete="reg_no"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset Password
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
