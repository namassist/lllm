"use client";

import * as React from "react";
import { useState } from "react";

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

  const appContextValue = {
    sheetOpen,
    setSheetOpen,
    cardType,
    setCardType,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
