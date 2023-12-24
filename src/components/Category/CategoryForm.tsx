import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface CategoryFormProps {
    onSubmit: (categoryName: string) => void;
    initialCategory?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, initialCategory = '' }) => {
    const [categoryName, setCategoryName] = useState<string>(initialCategory);

    useEffect(() => {
        // Устанавливаем начальное значение категории, если оно предоставлено
        if (initialCategory) {
            setCategoryName(initialCategory);
        }
    }, [initialCategory]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(categoryName);
        setCategoryName(''); // Сброс после отправки
    };

    const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="categoryName">Название категории:</label>
            <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={handleCategoryNameChange}
            />
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default CategoryForm;