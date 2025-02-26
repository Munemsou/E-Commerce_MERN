import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useCart } from "../context/Auth/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const CartPage = () => {
  const { cartItems, totalAmount } = useCart();

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ border: "1px solid #ccc", padding: 2, mt: 2, borderRadius: 4 }}
        >
          <Box display={"flex"} flexDirection="row" alignItems="center" gap={4}>
            <img src={item.image} alt={item.title} width="100" />
            <Box>
            <Typography variant="h6">{item.title}</Typography>
            <Typography>
              {item.quantity} x {item.unitPrice} €
            </Typography>
            <Button>Remove Item</Button>
            </Box>
          </Box>
          <ButtonGroup>
            <Button variant="contained" color="primary">
              +
            </Button>
            <Button variant="contained" color="secondary">
              -
            </Button>
          </ButtonGroup>
        </Box>
      ))}
      <Box mt={2}>
        <Typography variant="h4">Total: {totalAmount.toFixed(2)} €</Typography>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Box>
    </Container>
  );
};
export default CartPage;
