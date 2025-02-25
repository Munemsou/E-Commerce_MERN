import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

const CartPage = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if(!token) {
      return;
    }

    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Error in fetching cart");
        setErr("Unable to fetch cart");
        return;
      }
      const cart = await response.json();
      setCart(cart);
    };

    fetchCart();
  }, [token]);
  
  console.log(cart);

  
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
    </Container>
  );
};
export default CartPage;
