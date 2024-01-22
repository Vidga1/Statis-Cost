import React, { createContext, useState, useContext } from 'react';

const defaultState: CategoriesContextType = {
  categories: [],
  setCategories: () => {},
};

export const CategoriesContext =
  createContext<CategoriesContextType>(defaultState);

export const useCategoriesContext = () => useContext(CategoriesContext);

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
