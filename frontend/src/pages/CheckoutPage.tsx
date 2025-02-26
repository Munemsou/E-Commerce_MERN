import { Box, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useCart } from "../context/Auth/Cart/CartContext";
import Button from "@mui/material/Button";
import { useRef } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();

  const addressRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    const address = addressRef.current?.value;
    if (!address) {
      return;
    }
    console.log("confirm order", address);

    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ address }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log("Order confirmed");
    }
    else {
      console.log("Error in confirming order");
    }
    navigate("/order-success");
  };

  const renderCartItems = () => (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        mt: 2,
        borderRadius: 4,
      }}
    >
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display={"flex"}
            flexDirection="row"
            alignItems="center"
            gap={4}
            width={"100%"}
          >
            <img src={item.image} alt={item.title} width="50" />
            <Box
              display="flex"
              flexDirection="row"
              gap={2}
              justifyContent="space-between"
              alignItems={"center"}
              width={"100%"}
            >
              <Typography variant="h6">{item.title}</Typography>
              <Typography>
                {item.quantity} x {item.unitPrice} €
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}

      <Box>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          Total: {totalAmount.toFixed(2)} €
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container sx={{ mt: 2 }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <TextField
        inputRef={addressRef}
        label="Delivery Address"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
      />

      {renderCartItems()}
      <Button
        sx={{ mt: 2 }}
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleConfirmOrder}
      >
        Pay Now
      </Button>
    </Container>
  );
};
export default CheckoutPage;
