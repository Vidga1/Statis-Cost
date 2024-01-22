import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CategoryManager from '../src/components/category/CategoryManager';

// Мокирование модуля firebaseService
jest.mock('../src/firebase/firebaseService');

describe('CategoryManager', () => {
  const mockUserId = 'user123';
  const mockCategories = [
    { id: 1, name: 'Category 1', subcategories: [] },
    { id: 2, name: 'Category 2', subcategories: [] },
  ];

  beforeEach(() => {
    const firebaseService = jest.requireMock('../src/firebase/firebaseService');

    // Настройка моков
    firebaseService.loadUserCategories.mockResolvedValue(mockCategories);
    firebaseService.saveUserCategories.mockResolvedValue(null);
  });

  it('loads categories on component mount', async () => {
    const onCategoriesChange = jest.fn();

    render(
      <CategoryManager
        userId={mockUserId}
        onCategoriesChange={onCategoriesChange}
      />,
    );

    await waitFor(() => {
      const firebaseService = jest.requireMock(
        '../src/firebase/firebaseService',
      );
      expect(firebaseService.loadUserCategories).toHaveBeenCalledWith(
        mockUserId,
      );
      expect(onCategoriesChange).toHaveBeenCalledWith(true);
    });
  });

  it('allows adding a category', async () => {
    const { getByPlaceholderText, getByText } = render(
      <CategoryManager userId={mockUserId} onCategoriesChange={() => {}} />,
    );
    fireEvent.change(getByPlaceholderText('Добавить категорию'), {
      target: { value: 'New Category' },
    });
    fireEvent.keyDown(getByPlaceholderText('Добавить категорию'), {
      key: 'Enter',
    });

    await waitFor(() => {
      const firebaseService = jest.requireMock(
        '../src/firebase/firebaseService',
      );
      expect(getByText('New Category')).toBeInTheDocument();
      expect(firebaseService.saveUserCategories).toHaveBeenCalled();
    });
  });

  it('allows adding a category', async () => {
    const { getByPlaceholderText, getByText } = render(
      <CategoryManager userId={mockUserId} onCategoriesChange={() => {}} />,
    );
    fireEvent.change(getByPlaceholderText('Добавить категорию'), {
      target: { value: 'New Category' },
    });
    fireEvent.keyDown(getByPlaceholderText('Добавить категорию'), {
      key: 'Enter',
    });

    await waitFor(() => {
      const firebaseService = jest.requireMock(
        '../src/firebase/firebaseService',
      );
      expect(getByText('New Category')).toBeInTheDocument();
      expect(firebaseService.saveUserCategories).toHaveBeenCalled();
    });
  });

  it('allows editing a category name', async () => {
    const onCategoriesChange = jest.fn();
    const { findAllByText, getByDisplayValue } = render(
      <CategoryManager
        userId={mockUserId}
        onCategoriesChange={onCategoriesChange}
      />,
    );

    const editButtons = await findAllByText('Изменить');
    fireEvent.click(editButtons[0]); // Предполагая, что вы хотите нажать на кнопку "Изменить" для первой категории

    const input = getByDisplayValue('Category 1');
    fireEvent.change(input, { target: { value: 'Updated Category' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(onCategoriesChange).toHaveBeenCalled();
    });
  });

  it('allows deleting a category', async () => {
    const onCategoriesChange = jest.fn();
    const { findAllByText, queryByText } = render(
      <CategoryManager
        userId={mockUserId}
        onCategoriesChange={onCategoriesChange}
      />,
    );

    const deleteButtons = await findAllByText('Удалить');
    fireEvent.click(deleteButtons[0]); // Предполагая, что вы хотите нажать на кнопку "Удалить" для первой категории

    await waitFor(() => {
      expect(queryByText('Category 1')).not.toBeInTheDocument();
    });
  });
});
