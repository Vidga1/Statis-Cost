import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { loadUserCategories, Category as FirebaseCategory } from '../firebase/firebaseService';
import { setCategoriesForUser } from '../store/slices/categoriesSlice';

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

const MainPage: React.FC = () => {
  const { id } = useAuth();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categoriesByUserId[id || ''] || []);

  useEffect(() => {
    if (id) {
      const fetchCategories = async () => {
        const loadedCategories = await loadUserCategories(id);
        dispatch(setCategoriesForUser({ userId: id, categories: loadedCategories as FirebaseCategory[] }));
      };

      fetchCategories();
    }
  }, [id, dispatch]);

  return (
    <div>
      {categories.map((category: Category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          {category.subcategories.map((subcategory: Subcategory) => (
            <p key={subcategory.id}>{subcategory.name}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MainPage;
