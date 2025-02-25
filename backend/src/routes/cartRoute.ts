import express, { Request, Response } from "express";
import {
  addItemToCart,
  checkoutCart,
  clearCart,
  deleteItemInCart,
  getActiveCartForUser,
  updateItemInCart,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId, populateProduct: true });
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/", validateJWT, async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendedRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const response = await deleteItemInCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/checkout", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkoutCart({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
