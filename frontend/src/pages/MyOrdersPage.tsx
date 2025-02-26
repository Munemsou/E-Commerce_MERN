import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {
  const { getMyOrders, myOrders } = useAuth();

  useEffect(() => {
    getMyOrders();
  }, []);

  console.log(myOrders);

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
      <Typography variant="h4">My Orders</Typography>
      {myOrders.map(({ _id, address, orderItems, total }) => (
        <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 4 }}>
          <Typography variant="h6">Order ID: {_id}</Typography>
          <Typography variant="body1">Address: {address}</Typography>
          <Typography variant="body1">Items: {orderItems.length}</Typography>
          <Typography variant="body1">Total: {total}</Typography>
        </Box>
      ))}
    </Container>
  );
};
export default MyOrdersPage;
