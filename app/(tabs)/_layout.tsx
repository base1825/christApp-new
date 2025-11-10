// app/_layout.tsx
import { Stack } from 'expo-router';
import { createContext, ReactNode, useState } from 'react';

type MenuContextType = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <MenuContext.Provider value={{ isOpen, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </MenuProvider>
  );
}