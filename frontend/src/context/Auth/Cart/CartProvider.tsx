import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../../types/CartItem";
import { BASE_URL } from "../../../constants/baseUrl";
import { useAuth } from "../AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [err, setErr] = useState("");

   useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Error in fetching cart");
        setErr("Unable to fetch cart");
        return;
      }
      const cart = await response.json();
      
      const cartItemsMapped = cart.items.map(
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          unitPrice: product.unitPrice,
          image: product.image,
          quantity,
        })
      );
      setCartItems(cartItemsMapped);
    };

    fetchCart();
  }, [token]);

  const addToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setErr("Unable to add to cart");
      }

      const cart = await response.json();

      if (!cart) {
        setErr("Failed to parse cart data");
      }

      const cartItemsMapped = cart.items.map(
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          unitPrice: product.unitPrice,
          image: product.image,
          quantity,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
