import { createContext } from "react";

import { type Template } from "@/types/templates";

export type CartItem = Template & {
  quantity: number;
};

export type ContextValue = {
  items: CartItem[] | undefined;
  totalItems: number;
  totalPrice: number;
  addItem: (item: Template) => void;
  removeItem: (item: Template) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<ContextValue>({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: (): void => {},
  removeItem: (): void => {},
  updateQuantity: (): void => {},
  clearCart: (): void => {},
});
