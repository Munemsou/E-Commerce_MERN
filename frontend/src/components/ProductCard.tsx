import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../context/Auth/Cart/CartContext';

interface Props {
  _id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
}

export default function ProductCard({_id, title, image, price, stock}: Props) {
  const { addToCart } = useCart();

  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          € {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small" onClick={() => addToCart(_id)}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
