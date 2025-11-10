// MenuContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type Dish = {
  id: string;
  name: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert' | 'Drink';
  price: number;
};


type MenuContextType = {
  menu: Dish[];
  addDish: (dish: Dish) => void;
  removeDish: (id: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menu, setMenu] = useState<Dish[]>([]);

  const addDish = (dish: Dish) => setMenu(prev => [...prev, dish]);
  const removeDish = (id: string) => setMenu(prev => prev.filter(d => d.id !== id));

  return (
    <MenuContext.Provider value={{ menu, addDish, removeDish }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};