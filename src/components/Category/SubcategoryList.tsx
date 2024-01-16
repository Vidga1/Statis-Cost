import React, { useState } from 'react';

const SubcategoryList: React.FC<SubcategoryListProps> = ({
  subcategories,
  onAddSubcategory,
  onEditSubcategory,
  onDeleteSubcategory,
}) => {
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<
    number | null
  >(null);
  const [editingName, setEditingName] = useState('');

  const handleEditSubcategory = (
    e: React.KeyboardEvent,
    subcategoryId: number,
  ) => {
    if (e.key === 'Enter') {
      onEditSubcategory(subcategoryId, editingName);
      setEditingSubcategoryId(null);
      setEditingName('');
    }
  };

  return (
    <div>
      {subcategories.length < 5 && (
        <input
          type="text"
          placeholder="Добавить подкатегорию"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
              onAddSubcategory(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      )}
      {subcategories.map((subcat) => (
        <div key={subcat.id}>
          {editingSubcategoryId === subcat.id ? (
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onKeyDown={(e) => handleEditSubcategory(e, subcat.id)}
            />
          ) : (
            <>
              <span className="subcategory-name">{subcat.name}</span>
              <button
                onClick={() => {
                  setEditingSubcategoryId(subcat.id);
                  setEditingName(subcat.name);
                }}
              >
                Редактировать
              </button>
              <button onClick={() => onDeleteSubcategory(subcat.id)}>
                Удалить
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubcategoryList;
