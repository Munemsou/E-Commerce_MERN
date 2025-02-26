import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useCart } from "../context/Auth/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const CartPage = () => {
  const { cartItems, totalAmount, updateItemInCart, removeItemFromCart } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if(quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };

  const handleRemoveButton = (productId: string) => {
    console.log("remove item", productId);
    
    removeItemFromCart(productId);
  };

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
            <Button onClick={() => handleRemoveButton(item.productId)}>Remove Item</Button>
            </Box>
          </Box>
          <ButtonGroup>
            <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)} variant="contained" color="primary">
              +
            </Button>
            <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)} variant="contained" color="secondary">
              -
            </Button>
          </ButtonGroup>
        </Box>
      ))}
      <Box m={2}>
        <Typography variant="h4">Total: {totalAmount.toFixed(2)} €</Typography>
        <Button sx={{mt: .5}} variant="contained" color="primary">
          Checkout
        </Button>
      </Box>
    </Container>
  );
};
export default CartPage;
