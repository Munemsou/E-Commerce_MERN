import { Box, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useCart } from "../context/Auth/Cart/CartContext";
import Button from "@mui/material/Button";
import { useRef } from "react";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();

  const addressRef = useRef<HTMLInputElement>(null);

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
      <Button sx={{ mt: 2 }} fullWidth variant="contained" color="primary">
        Pay Now
      </Button>
    </Container>
  );
};
export default CheckoutPage;
