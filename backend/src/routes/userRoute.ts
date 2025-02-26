import express, { response } from "express";
import { getMyOrders, login, register } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/extendedRequest";

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

router.get(
  "/my-orders",
  validateJWT,
  async (request: ExtendedRequest, response) => {
    try {
      const userId = request?.user?._id;
      const { statusCode, data } = await getMyOrders({ userId });
      response.status(statusCode).send(data);
    } catch (error) {
      console.log(error);
      response.status(500).send("Internal Server Error");
    }
  }
);

export default router;
