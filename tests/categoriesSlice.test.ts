import categoriesReducer, {
  setCategoriesForUser,
  addCategory,
  updateCategory,
  deleteCategory,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from '../src/store/slices/categoriesSlice';

describe('categoriesSlice', () => {
  const initialState = {
    categoriesByUserId: {},
  };

  it('should handle initial state', () => {
    expect(categoriesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle setCategoriesForUser', () => {
    const actual = categoriesReducer(
      initialState,
      setCategoriesForUser({
        userId: 'user1',
        categories: [{ id: 1, name: 'Food', subcategories: [] }],
      }),
    );
    expect(actual.categoriesByUserId['user1']).toEqual([
      { id: 1, name: 'Food', subcategories: [] },
    ]);
  });

  it('should handle addCategory', () => {
    const state = {
      categoriesByUserId: {
        user1: [{ id: 1, name: 'Food', subcategories: [] }],
      },
    };
    const actual = categoriesReducer(
      state,
      addCategory({
        userId: 'user1',
        category: { id: 2, name: 'Transport', subcategories: [] },
      }),
    );
    expect(actual.categoriesByUserId['user1']).toHaveLength(2);
    expect(actual.categoriesByUserId['user1'][1]).toEqual({
      id: 2,
      name: 'Transport',
      subcategories: [],
    });
  });

  it('should handle updateCategory', () => {
    const state = {
      categoriesByUserId: {
        user1: [{ id: 1, name: 'Food', subcategories: [] }],
      },
    };
    const actual = categoriesReducer(
      state,
      updateCategory({
        userId: 'user1',
        categoryId: 1,
        newName: 'Groceries',
      }),
    );
    expect(actual.categoriesByUserId['user1'][0].name).toEqual('Groceries');
  });

  it('should handle deleteCategory', () => {
    const state = {
      categoriesByUserId: {
        user1: [{ id: 1, name: 'Food', subcategories: [] }],
      },
    };
    const actual = categoriesReducer(
      state,
      deleteCategory({
        userId: 'user1',
        categoryId: 1,
      }),
    );
    expect(actual.categoriesByUserId['user1']).toEqual([]);
  });
  it('should handle addSubcategory', () => {
    const state = {
      categoriesByUserId: {
        user1: [{ id: 1, name: 'Food', subcategories: [] }],
      },
    };
    const actual = categoriesReducer(
      state,
      addSubcategory({
        userId: 'user1',
        categoryId: 1,
        subcategory: { id: 101, name: 'Fruits' },
      }),
    );
    expect(actual.categoriesByUserId['user1'][0].subcategories).toEqual([
      { id: 101, name: 'Fruits' },
    ]);
  });

  it('should handle updateSubcategory', () => {
    const state = {
      categoriesByUserId: {
        user1: [
          { id: 1, name: 'Food', subcategories: [{ id: 101, name: 'Fruits' }] },
        ],
      },
    };
    const actual = categoriesReducer(
      state,
      updateSubcategory({
        userId: 'user1',
        categoryId: 1,
        subcategoryId: 101,
        newName: 'Vegetables',
      }),
    );
    expect(actual.categoriesByUserId['user1'][0].subcategories[0].name).toEqual(
      'Vegetables',
    );
  });

  it('should handle deleteSubcategory', () => {
    const state = {
      categoriesByUserId: {
        user1: [
          { id: 1, name: 'Food', subcategories: [{ id: 101, name: 'Fruits' }] },
        ],
      },
    };
    const actual = categoriesReducer(
      state,
      deleteSubcategory({
        userId: 'user1',
        categoryId: 1,
        subcategoryId: 101,
      }),
    );
    expect(actual.categoriesByUserId['user1'][0].subcategories).toEqual([]);
  });
});
