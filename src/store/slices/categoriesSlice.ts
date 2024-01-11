import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface CategoriesState {
  categoriesByUserId: {
    [userId: string]: Category[];
  };
}

const initialState: CategoriesState = {
  categoriesByUserId: {},
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesForUser(
      state,
      action: PayloadAction<{ userId: string; categories: Category[] }>
    ) {
      const { userId, categories } = action.payload;
      state.categoriesByUserId[userId] = categories;
    },
    addCategory(
      state,
      action: PayloadAction<{ userId: string; category: Category }>
    ) {
      const { userId, category } = action.payload;
      if (!state.categoriesByUserId[userId]) {
        state.categoriesByUserId[userId] = [];
      }
      state.categoriesByUserId[userId].push(category);
    },
    updateCategory(
      state,
      action: PayloadAction<{ userId: string; categoryId: number; newName: string }>
    ) {
      const { userId, categoryId, newName } = action.payload;
      const categories = state.categoriesByUserId[userId];
      if (categories) {
        const index = categories.findIndex(c => c.id === categoryId);
        if (index !== -1) {
          categories[index].name = newName;
        }
      }
    },
    deleteCategory(
      state,
      action: PayloadAction<{ userId: string; categoryId: number }>
    ) {
      const { userId, categoryId } = action.payload;
      const categories = state.categoriesByUserId[userId];
      if (categories) {
        state.categoriesByUserId[userId] = categories.filter(c => c.id !== categoryId);
      }
    },
    // Подобные редукторы могут быть добавлены для управления подкатегориями
  },
});

export const {
  setCategoriesForUser,
  addCategory,
  updateCategory,
  deleteCategory
} = categoriesSlice.actions;

export default categoriesSlice.reducer;