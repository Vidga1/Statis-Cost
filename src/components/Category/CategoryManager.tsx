import React, { useState, useEffect, useRef } from 'react';
import SubcategoryList from './SubcategoryList';
import {
  loadUserCategories,
  saveUserCategories,
} from '../../firebase/firebaseService';
import { debounce } from 'lodash';

const CategoryManager: React.FC<CategoryManagerProps> = ({
  userId,
  onCategoriesChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );
  const [editingCategoryName, setEditingCategoryName] = useState('');

  const debouncedSaveCategoriesRef = useRef(
    debounce((categories: Category[]) => {
      saveUserCategories(userId, categories);
    }, 1000),
  );

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
    if (categories.length > 0) {
      debouncedSaveCategoriesRef.current(categories);
    }
  }, [categories]);

  const updateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    saveUserCategories(userId, newCategories);
    onCategoriesChange(newCategories.length > 0);
  };

  const handleAddCategory = (categoryName: string) => {
    const newCategory: Category = {
      id: Date.now(),
      name: categoryName,
      subcategories: [],
    };
    updateCategories([...categories, newCategory]);
  };

  const handleEditCategory = (categoryId: number) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, name: editingCategoryName } : cat,
    );
    updateCategories(updatedCategories);
    setEditingCategoryId(null);
    setEditingCategoryName('');
  };

  const handleDeleteCategory = (categoryId: number) => {
    const updatedCategories = categories.filter((cat) => cat.id !== categoryId);
    updateCategories(updatedCategories);
  };

  const handleAddSubcategory = (
    categoryId: number,
    subcategoryName: string,
  ) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            subcategories: [
              ...cat.subcategories,
              { id: Date.now(), name: subcategoryName },
            ],
          }
        : cat,
    );
    updateCategories(updatedCategories);
  };

  const handleEditSubcategory = (
    categoryId: number,
    subcategoryId: number,
    newName: string,
  ) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId
        ? {
            ...category,
            subcategories: category.subcategories.map((subcat) =>
              subcat.id === subcategoryId
                ? { ...subcat, name: newName }
                : subcat,
            ),
          }
        : category,
    );
    updateCategories(updatedCategories);
  };

  const handleDeleteSubcategory = (
    categoryId: number,
    subcategoryId: number,
  ) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId
        ? {
            ...category,
            subcategories: category.subcategories.filter(
              (subcat) => subcat.id !== subcategoryId,
            ),
          }
        : category,
    );
    updateCategories(updatedCategories);
  };

  return (
    <div>
      <div className="add-category-container">
        <input
          type="text"
          className="add-category-input"
          placeholder="Добавить категорию"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
              handleAddCategory(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
      {categories.map((category) => (
        <div key={category.id} className="category-block">
          {editingCategoryId === category.id ? (
            <input
              type="text"
              value={editingCategoryName}
              onChange={(e) => setEditingCategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEditCategory(category.id);
              }}
            />
          ) : (
            <>
              <span className="category-name">{category.name}</span>
              <button
                onClick={() => {
                  setEditingCategoryId(category.id);
                  setEditingCategoryName(category.name);
                }}
              >
                Изменить
              </button>
              <button onClick={() => handleDeleteCategory(category.id)}>
                Удалить
              </button>
            </>
          )}
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
