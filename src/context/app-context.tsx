"use client";

import * as React from "react";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const AppContext = React.createContext({});

export function useAppContext() {
  return React.useContext(AppContext);
}

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cardType, setCardType] = useState<string>("grid");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [font, setFont] = useLocalStorage<string>("novel__font", "Default");

  const appContextValue = {
    sheetOpen,
    setSheetOpen,
    cardType,
    setCardType,
    font,
    setFont,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
