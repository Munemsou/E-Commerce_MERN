import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';


const LoginPage = () => {
  const [err, setErr] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email, password);

    if (!email || !password) {
      setErr("Please fill all the fields");
      return;
    }

    // Make the call to API to register the user
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      console.log("Error in Login user");
      setErr("Unable to Login user");
      return;
    }
    const token = await response.json();

    if (!token) {
      setErr("Incorrect token");
      return;
    }

    login(email, token);
    navigate("/");

    // console.log(token);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h6">Login to your Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            mt: 2,
            gap: 2,
            border: "1px solid #ccc",
            p: 2,
          }}
        >
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            label="Password"
            name="password"
            type="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Login
          </Button>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create one
            </Link>{" "}
          </Typography>

          {err && (
            <Typography sx={{ color: "error", textAlign: "center" }}>
              {err}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
