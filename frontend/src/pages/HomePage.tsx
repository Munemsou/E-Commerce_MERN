import ProductCard from "../components/ProductCard";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product`);
        const data = await res.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <Box>Something went wrong, please try again later!</Box>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={{ md: 4, sm: 6 }}>
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
