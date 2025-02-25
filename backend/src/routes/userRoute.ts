import express, { response } from "express";
import { login, register } from "../services/userService";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    response.status(statusCode).json(data);
  } catch (error) {
    console.log(error);
    response.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (requst, response) => {
  try {
    const { email, password } = requst.body;
    const { statusCode, data } = await login({ email, password });
    response.status(statusCode).json(data);
  } catch (error) {
    console.log(error);
    response.status(500).send("Internal Server Error");
  }
});

export default router;
