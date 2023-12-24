import React, { useState } from 'react';
import CategoryForm from './components/Category/CategoryForm';
import SubcategoryList from './components/Category/SubcategoryList';

interface Subcategory {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}

const CategoryManager: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleAddCategory = (categoryName: string) => {
        setCategories([...categories, { id: Date.now(), name: categoryName, subcategories: [] }]);
    };

    const handleEditCategory = (categoryName: string) => {
        if (editingCategory) {
            setCategories(categories.map(cat => 
                cat.id === editingCategory.id ? { ...cat, name: categoryName } : cat
            ));
            setEditingCategory(null);
        }
    };

    const handleDeleteCategory = (categoryId: number) => {
        setCategories(categories.filter(cat => cat.id !== categoryId));
    };

    const handleAddSubcategory = (categoryId: number, subcategoryName: string) => {
        setCategories(categories.map(cat => {
            if (cat.id === categoryId && cat.subcategories.length < 5) {
                return {
                    ...cat, 
                    subcategories: [...cat.subcategories, { id: Date.now(), name: subcategoryName }]
                };
            }
            return cat;
        }));
    };

    const handleEditSubcategory = (categoryId: number, subcategoryId: number, newName: string) => {
        setCategories(categories.map(category => {
            if (category.id === categoryId) {
                return {
                    ...category, 
                    subcategories: category.subcategories.map(subcat => 
                        subcat.id === subcategoryId ? { ...subcat, name: newName } : subcat
                    )
                };
            }
            return category;
        }));
    };

    const handleDeleteSubcategory = (categoryId: number, subcategoryId: number) => {
        setCategories(categories.map(category => {
            if (category.id === categoryId) {
                return {
                    ...category, 
                    subcategories: category.subcategories.filter(subcat => subcat.id !== subcategoryId)
                };
            }
            return category;
        }));
    };

    return (
        <div>
            <CategoryForm 
                onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
                initialCategory={editingCategory ? editingCategory.name : ''}
            />
            {categories.map(category => (
                <div key={category.id}>
                    <div>
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