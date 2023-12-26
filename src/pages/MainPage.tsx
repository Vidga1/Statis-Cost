import React, { useState } from 'react';
import { useCategoriesContext } from '../components/Category/CategoriesContext';

const MainPage = () => {
    const { categories } = useCategoriesContext();
    const [expense, setExpense] = useState<{ [key: string]: string }>({});
    const [date, setDate] = useState<string>('');
  
    const handleExpenseChange = (categoryId: number, value: string) => {
      setExpense({ ...expense, [categoryId]: value });
    };
  
    const handleSubmit = () => {
      console.log('Расходы:', expense, 'Дата:', date);
      // Логика отправки данных
    };

  return (
    <div>
      <h1>Ввод расходов</h1>
      {categories.map(category => (
        <div key={category.id}>
          <strong>{category.name}</strong>
          {category.subcategories.map(subcat => (
            <div key={subcat.id}>
              {subcat.name}
              <input
                type="number"
                placeholder="Сумма"
                onChange={(e) => handleExpenseChange(subcat.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSubmit}>Сохранить расходы</button>
    </div>
  );
};

export default MainPage;