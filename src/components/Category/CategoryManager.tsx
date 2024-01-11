import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import SubcategoryList from './SubcategoryList';
import { loadUserCategories, saveUserCategories } from '../../firebase/firebaseService';

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

const CategoryManager: React.FC<CategoryManagerProps> = ({
  userId,
  onCategoriesChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const loadedCategories = await loadUserCategories(userId);
      if (loadedCategories) {
        setCategories(loadedCategories);
        onCategoriesChange(loadedCategories.length > 0);
      }
    };

    fetchCategories();
  }, [userId, onCategoriesChange]);

  useEffect(() => {
    saveUserCategories(userId, categories).catch(error => {
      console.error('Ошибка при сохранении категорий:', error);
    });
  }, [categories, userId]);

  const handleAddCategory = (categoryName: string) => {
    const newCategory: Category = {
      id: Date.now(),
      name: categoryName,
      subcategories: []
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleEditCategory = (categoryName: string) => {
    if (editingCategory) {
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editingCategory.id ? { ...cat, name: categoryName } : cat
        )
      );
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const handleAddSubcategory = (categoryId: number, subcategoryName: string) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            subcategories: [
              ...cat.subcategories,
              { id: Date.now(), name: subcategoryName }
            ]
          };
        }
        return cat;
      })
    );
  };

  const handleEditSubcategory = (categoryId: number, subcategoryId: number, newName: string) => {
    setCategories(prev =>
      prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.map(subcat =>
              subcat.id === subcategoryId ? { ...subcat, name: newName } : subcat
            )
          };
        }
        return category;
      })
    );
  };

  const handleDeleteSubcategory = (categoryId: number, subcategoryId: number) => {
    setCategories(prev =>
      prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.filter(subcat => subcat.id !== subcategoryId)
          };
        }
        return category;
      })
    );
  };

  return (
    <div>
      <CategoryForm
        onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
        initialCategory={editingCategory ? editingCategory.name : ''}
      />
      {categories.map((category) => (
        <div key={category.id} className="category-block">
          <div className="category-name">
            {category.name}
            <button onClick={() => setEditingCategory(category)}>
              Редактировать
            </button>
            <button onClick={() => handleDeleteCategory(category.id)}>
              Удалить
            </button>
          </div>
          <SubcategoryList
            subcategories={category.subcategories}
            onAddSubcategory={(name) => handleAddSubcategory(category.id, name)}
            onEditSubcategory={(subcatId, newName) =>
              handleEditSubcategory(category.id, subcatId, newName)
            }
            onDeleteSubcategory={(subcatId) =>
              handleDeleteSubcategory(category.id, subcatId)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryManager;
