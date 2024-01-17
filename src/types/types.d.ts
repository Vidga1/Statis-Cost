interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface CategoryExpenses {
  [categoryId: string]: number;
}

interface SubcategoryExpenses {
  [key: string]: number;
}

interface CategoryDates {
  [categoryId: string]: Date | null;
}

interface ExpenseRecord {
  id: string;
  categoryId: string;
  date: Date;
  totalExpense: number;
}

interface IncomeRecord {
  id: string;
  categoryId: string;
  date: Date;
  totalIncome: number;
}

interface ExpenseItemProps {
  record: ExpenseRecord;
  onRemove: (id: string) => void;
}

interface IncomeItemProps {
  record: IncomeRecord;
  onRemove: (id: string) => void;
}

interface CategoriesContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

interface CategoriesContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

interface CategoryFormProps {
  onSubmit: (categoryName: string) => void;
  initialCategory?: string;
}

interface CategoryManagerProps {
  userId: string;
  onCategoriesChange: (hasCategories: boolean) => void;
}

interface SubcategoryListProps {
  subcategories: Subcategory[];
  onAddSubcategory: (subcategoryName: string) => void;
  onEditSubcategory: (subcategoryId: number, newName: string) => void;
  onDeleteSubcategory: (subcategoryId: number) => void;
}

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

interface UserData {
  email: string;
  token: string;
  id: string;
}

interface CategoriesState {
  categoriesByUserId: {
    [userId: string]: Category[];
  };
}

interface CategoriesState {
  categoriesByUserId: {
    [userId: string]: Category[];
  };
}

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
}