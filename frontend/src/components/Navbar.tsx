import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../context/Auth/AuthContext";
import Grid2 from "@mui/material/Grid2";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Auth/Cart/CartContext";

function Navbar() {
  const { username, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // console.log("from navbar", username, token);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleMyOrders = () => {
    navigate("/my-orders");
    handleCloseUserMenu();
  }
  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={() => navigate("/")}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AdbIcon sx={{ display: "flex", mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Tech Hub
                </Typography>
              </Box>
            </Button>

            <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
              <IconButton aria-label="cart" onClick={handleCart}>
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCart sx={{ color: "#fff" }} />
                </Badge>
              </IconButton>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <Grid2 container alignItems={"center"} gap={1}>
                      <Grid2 component="div">
                        <Typography>{username}</Typography>
                      </Grid2>
                      <Grid2 component={"div"}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt={username || ""}
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
                      </Grid2>
                    </Grid2>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleMyOrders}>
                      <Typography sx={{ textAlign: "center" }}>
                        My Orders
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography sx={{ textAlign: "center" }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button variant="contained" onClick={handleLogin}>
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
