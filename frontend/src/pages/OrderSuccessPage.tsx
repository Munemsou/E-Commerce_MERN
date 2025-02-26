import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const handleContinueShopping = () => {
    navigate("/");
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 4,
      }}
    >
      <CheckCircleOutline sx={{ fontSize: "80px", color: "green" }} />
      <Typography variant="h4">Order Placed Successfully</Typography>
      <Typography variant="body1">
        Thanks for your Order. You will receive an email
        confirmation shortly.
      </Typography>
      <Button variant="contained" onClick={handleContinueShopping}>
        Continue Shopping
      </Button>
    </Container>
  );
};
export default OrderSuccessPage;
