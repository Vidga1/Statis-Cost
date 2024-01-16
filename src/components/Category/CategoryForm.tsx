import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  initialCategory = '',
}) => {
  const [categoryName, setCategoryName] = useState<string>(initialCategory);

  useEffect(() => {
    if (initialCategory) {
      setCategoryName(initialCategory);
    }
  }, [initialCategory]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      alert('Введите название категории');
      return;
    }
    onSubmit(categoryName);
    setCategoryName('');
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
