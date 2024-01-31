import React, { useState } from 'react';

const SubcategoryList: React.FC<SubcategoryListProps> = ({
  subcategories,
  onAddSubcategory,
  onEditSubcategory,
  onDeleteSubcategory,
}) => {
  const [editingSubcategory, setEditingSubcategory] = useState<{
    id: number | null;
    name: string;
  }>({ id: null, name: '' });

  const handleEditSubcategory = (
    e: React.KeyboardEvent,
    subcategoryId: number,
  ) => {
    if (e.key === 'Enter') {
      onEditSubcategory(subcategoryId, editingSubcategory.name);
      setEditingSubcategory({ id: null, name: '' });
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
          {editingSubcategory.id === subcat.id ? (
            <input
              type="text"
              value={editingSubcategory.name}
              onChange={(e) =>
                setEditingSubcategory({
                  ...editingSubcategory,
                  name: e.target.value,
                })
              }
              onKeyDown={(e) => handleEditSubcategory(e, subcat.id)}
            />
          ) : (
            <>
              <span className="subcategory-name">{subcat.name}</span>
              <button
                onClick={() => {
                  setEditingSubcategory({ id: subcat.id, name: subcat.name });
                }}
              >
                Изменить
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
