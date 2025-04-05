import ProductCard from "../components/ProductCard";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL, BASE_URL_PRODUCTION } from "../constants/baseUrl";
import CircularWithValueLabel from "../components/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  margin: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const url =
    process.env.NODE_ENV === "production" ? BASE_URL_PRODUCTION : BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/product`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <CircularWithValueLabel />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        Something went wrong, please try again later!
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id.toString()}>
            <Item>
              <ProductCard {...product} _id={product._id.toString()} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;