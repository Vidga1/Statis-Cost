import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SubcategoryList from '../src/components/Category/SubcategoryList';

describe('SubcategoryList', () => {
  const mockSubcategories = [
    { id: 1, name: 'Subcategory 1' },
    { id: 2, name: 'Subcategory 2' },
  ];

  const onAddSubcategory = jest.fn();
  const onEditSubcategory = jest.fn();
  const onDeleteSubcategory = jest.fn();

  it('renders subcategories', () => {
    const { getByText } = render(
      <SubcategoryList
        subcategories={mockSubcategories}
        onAddSubcategory={onAddSubcategory}
        onEditSubcategory={onEditSubcategory}
        onDeleteSubcategory={onDeleteSubcategory}
      />,
    );

    expect(getByText('Subcategory 1')).toBeInTheDocument();
    expect(getByText('Subcategory 2')).toBeInTheDocument();
  });

  it('allows adding a subcategory', () => {
    const { getByPlaceholderText } = render(
      <SubcategoryList
        subcategories={mockSubcategories}
        onAddSubcategory={onAddSubcategory}
        onEditSubcategory={onEditSubcategory}
        onDeleteSubcategory={onDeleteSubcategory}
      />,
    );

    fireEvent.change(getByPlaceholderText('Добавить подкатегорию'), {
      target: { value: 'New Subcategory' },
    });
    fireEvent.keyDown(getByPlaceholderText('Добавить подкатегорию'), {
      key: 'Enter',
    });

    expect(onAddSubcategory).toHaveBeenCalledWith('New Subcategory');
  });

  it('allows editing a subcategory', () => {
    const { getAllByText, getByDisplayValue } = render(
      <SubcategoryList
        subcategories={mockSubcategories}
        onAddSubcategory={onAddSubcategory}
        onEditSubcategory={onEditSubcategory}
        onDeleteSubcategory={onDeleteSubcategory}
      />,
    );

    fireEvent.click(getAllByText('Изменить')[0]);
    fireEvent.change(getByDisplayValue('Subcategory 1'), {
      target: { value: 'Edited Subcategory' },
    });
    fireEvent.keyDown(getByDisplayValue('Edited Subcategory'), {
      key: 'Enter',
    });

    expect(onEditSubcategory).toHaveBeenCalledWith(1, 'Edited Subcategory');
  });

  it('allows deleting a subcategory', () => {
    const { getAllByText } = render(
      <SubcategoryList
        subcategories={mockSubcategories}
        onAddSubcategory={onAddSubcategory}
        onEditSubcategory={onEditSubcategory}
        onDeleteSubcategory={onDeleteSubcategory}
      />,
    );

    fireEvent.click(getAllByText('Удалить')[0]);

    expect(onDeleteSubcategory).toHaveBeenCalledWith(1);
  });
});
