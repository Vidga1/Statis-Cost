import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface CategoriesContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const defaultState: CategoriesContextType = {
  categories: [],
  setCategories: () => {},
};

export const CategoriesContext =
  createContext<CategoriesContextType>(defaultState);

export const useCategoriesContext = () => useContext(CategoriesContext);

interface CategoriesProviderProps {
  children: ReactNode;
}

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
