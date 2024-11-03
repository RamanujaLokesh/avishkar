import { React } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const reg_no = data.get("reg_no"); // Get registration number
        const password = data.get("password");

        const url = process.env.REACT_APP_BACKEND_URL + "/api/login";
        const res = await axios.post(url, { reg_no: reg_no, password: password }); // Use reg_no

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
            navigate("/main");
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
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="reg_no"
                                label="Registration Number"  // Changed label to Registration Number
                                name="reg_no"
                                autoComplete="reg_no"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item sm>
                                    <Link
                                        href="/forgotPassword"
                                        variant="body2"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Login;
