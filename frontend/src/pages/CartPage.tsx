import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useCart } from "../context/Auth/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };

  const handleRemoveButton = (productId: string) => {
    console.log("remove item", productId);

    removeItemFromCart(productId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const renderCartItems = () => (
    <Box display="flex" flexDirection="column" gap={1}>
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            border: "1px solid #ccc",
            padding: 2,
            mt: 2,
            borderRadius: 4,
          }}
        >
          <Box display={"flex"} flexDirection="row" alignItems="center" gap={4}>
            <img src={item.image} alt={item.title} width="100" />
            <Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>
                {item.quantity} x {item.unitPrice} €
              </Typography>
              <Button onClick={() => handleRemoveButton(item.productId)}>
                Remove Item
              </Button>
            </Box>
          </Box>
          <ButtonGroup>
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity + 1)}
              variant="contained"
              color="primary"
            >
              +
            </Button>
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity - 1)}
              variant="contained"
              color="secondary"
            >
              -
            </Button>
          </ButtonGroup>
        </Box>
      ))}

      <Box m={2} display={"flex"} flexDirection="row" justifyContent="space-between" >
        <Typography variant="h4">Total: {totalAmount.toFixed(2)} €</Typography>
        <Button sx={{ mt: 0.5 }} variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Container sx={{ mt: 2 }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4">My Cart</Typography>
        <Button onClick={clearCart}>Clear Cart</Button>
      </Box>
      {cartItems.length ? (
        renderCartItems()
      ) : (
        <Typography variant="h6">No items in cart</Typography>
      )}
    </Container>
  );
};
export default CartPage;
