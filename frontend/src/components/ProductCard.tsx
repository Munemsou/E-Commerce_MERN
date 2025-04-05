import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../context/Auth/Cart/CartContext';
import { useAuth } from '../context/Auth/AuthContext';
import LoginPromptDialog from './LoginPromptDialog';
import { useNavigate } from 'react-router-dom';

interface Props {
  _id: string;
  title: string;
  image: string;
  price: number;
}

export default function ProductCard({_id, title, image, price}: Props) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart(_id);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setOpen(false);
  };

  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={image}
        title={title}
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
        <Button variant='contained' size="small" onClick={handleAddToCart}>Add to Cart</Button>
      </CardActions>
      <LoginPromptDialog open={open} onClose={handleClose} onLogin={handleLogin} />
    </Card>
  );
}