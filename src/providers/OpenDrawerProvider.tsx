"use client";

import { PropsWithChildren, ReactNode, useContext, useState } from "react";

import { ContextValue, DrawerContext } from "@/context/open-drawer";

type CartProviderProps = PropsWithChildren;

export default function DrawerProvider({
  children,
}: CartProviderProps): ReactNode {
  const [open, setOpen] = useState<boolean>();

  const openDrawer = (): void => {
    setOpen(true);
  };
  const closeDrawer = (): void => {
    setOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{
        open,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer(): ContextValue {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("useDrawer error");
  return context;
}
