import { createContext, useContext } from "react";
import { CartItem } from "../../../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addToCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantity: number) => void;
  removeItemFromCart: (productId: string) => void;
}
export const CartContext = createContext<CartContextType>({
    cartItems: [],
    totalAmount: 0,
    addToCart: () => {},
    updateItemInCart: () => {},
    removeItemFromCart: () => {},
});

export const useCart = () => useContext(CartContext);
