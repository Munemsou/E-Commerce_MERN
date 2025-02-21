import express, { Request, Response } from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";

interface AuthenticatedRequest extends Request {
  user?: { _id: string };
}

const router = express.Router();

router.get("/", validateJWT, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

export default router;
