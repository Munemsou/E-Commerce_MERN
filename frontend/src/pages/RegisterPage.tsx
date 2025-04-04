import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [err, setErr] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    // console.log(firstName, lastName, email, password);


    if (!firstName || !lastName || !email || !password) {
      setErr("Please fill all the fields");
      return;
    }

    // Make the call to API to register the user
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      console.log("Error in registering user");
      setErr("Unable to register user");
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
        <Typography variant="h6">Register New Account</Typography>
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
          <TextField
            inputRef={firstNameRef}
            label="First Name"
            name="firstName"
          />
          <TextField inputRef={lastNameRef} label="Last Name" name="lastName" />
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            label="Password"
            name="password"
            type="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Register
          </Button>
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
export default RegisterPage;
