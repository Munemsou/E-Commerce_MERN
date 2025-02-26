import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useCart } from "../context/Auth/Cart/CartContext";

const CartPage = () => {
  const { token } = useAuth();
  const { cartItems, totalAmount } = useCart();
  const [err, setErr] = useState("");

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((item) => (
        <Box>{item.title}</Box>
      ))}
    </Container>
  );
};
export default CartPage;
