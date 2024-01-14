import React, { useState, useEffect, useRef } from 'react';
import CategoryForm from './CategoryForm';
import SubcategoryList from './SubcategoryList';
import { loadUserCategories, saveUserCategories } from '../../firebase/firebaseService';
import { debounce } from 'lodash';

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface CategoryManagerProps {
  userId: string;
  onCategoriesChange: (hasCategories: boolean) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ userId, onCategoriesChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const debouncedSaveCategoriesRef = useRef(debounce((categories: Category[]) => {
    saveUserCategories(userId, categories);
  }, 1000));

  useEffect(() => {
    // Функция загрузки категорий
    const fetchCategories = async () => {
      const loadedCategories = await loadUserCategories(userId);
      if (loadedCategories) {
        setCategories(loadedCategories);
        onCategoriesChange(loadedCategories.length > 0);
      }
    };

    // Вызов функции загрузки при монтировании компонента
    fetchCategories();
  }, [userId, onCategoriesChange]);

  useEffect(() => {
    if (categories.length > 0) {
      debouncedSaveCategoriesRef.current(categories);
    }
  }, [categories, userId]);

  const updateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    saveUserCategories(userId, newCategories); // Сохраняем изменения
  };

  // Обработчики действий с категориями и подкатегориями
  const handleAddCategory = (categoryName: string) => {
    const newCategory: Category = {
      id: Date.now(),
      name: categoryName,
      subcategories: []
    };
    updateCategories([...categories, newCategory]);
  };

  const handleEditCategory = (categoryName: string) => {
    if (editingCategory) {
      const updatedCategories = categories.map(cat => cat.id === editingCategory.id ? { ...cat, name: categoryName } : cat);
      updateCategories(updatedCategories);
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    updateCategories(updatedCategories);
  };

  const handleAddSubcategory = (categoryId: number, subcategoryName: string) => {
    const updatedCategories = categories.map(cat => cat.id === categoryId ? { ...cat, subcategories: [...cat.subcategories, { id: Date.now(), name: subcategoryName }] } : cat);
    updateCategories(updatedCategories);
  };

  const handleEditSubcategory = (categoryId: number, subcategoryId: number, newName: string) => {
    const updatedCategories = categories.map(category => category.id === categoryId ? { ...category, subcategories: category.subcategories.map(subcat => subcat.id === subcategoryId ? { ...subcat, name: newName } : subcat) } : category);
    updateCategories(updatedCategories);
  };

  const handleDeleteSubcategory = (categoryId: number, subcategoryId: number) => {
    const updatedCategories = categories.map(category => category.id === categoryId ? { ...category, subcategories: category.subcategories.filter(subcat => subcat.id !== subcategoryId) } : category);
    updateCategories(updatedCategories);
  };

  return (
    <div>
      <CategoryForm onSubmit={editingCategory ? handleEditCategory : handleAddCategory} initialCategory={editingCategory ? editingCategory.name : ''} />
      {categories.map((category) => (
        <div key={category.id} className="category-block">
          <div className="category-name">
            {category.name}
            <button onClick={() => setEditingCategory(category)}>Редактировать</button>
            <button onClick={() => handleDeleteCategory(category.id)}>Удалить</button>
          </div>
          <SubcategoryList
            subcategories={category.subcategories}
            onAddSubcategory={(name) => handleAddSubcategory(category.id, name)}
            onEditSubcategory={(subcatId, newName) => handleEditSubcategory(category.id, subcatId, newName)}
            onDeleteSubcategory={(subcatId) => handleDeleteSubcategory(category.id, subcatId)}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryManager;
