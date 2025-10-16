"use client";

import {
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CartItem } from "@/context/cart-context";
import { CartContext } from "@/context/cart-context";
import { type ContextValue } from "@/context/cart-context";

import { Template } from "@/types/templates";

type CartProviderProps = PropsWithChildren;

export default function CartProvider({
  children,
}: CartProviderProps): ReactNode {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    setTotalItems(items.reduce((sum, i) => sum + i.quantity, 0));
    setTotalPrice(items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  }, [items]);

  const addItem = (item: Template): void => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity + 1 }
            : prevItem,
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (item: Template): void => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const clearCart = (): void => {
    setItems([]);
  };

  const updateQuantity = (id: string, quantity: number): void => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== id);
      }

      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): ContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
