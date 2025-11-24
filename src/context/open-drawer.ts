import { createContext } from "react";

export type ContextValue = {
  open: boolean | undefined;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const DrawerContext = createContext<ContextValue>({
  open: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});
