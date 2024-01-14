import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../../firebase/firebase'; // Импорт firestore
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
};

export const saveUserToFirestore = createAsyncThunk(
  'user/saveToFirestore',
  async (userData: { email: string; token: string; id: string }) => {
    const userRef = doc(firestore, 'users', userData.id);
    await setDoc(userRef, userData);
  },
);

export const removeUserFromFirestore = createAsyncThunk(
  'user/removeFromFirestore',
  async (userId: string) => {
    const userRef = doc(firestore, 'users', userId);
    await deleteDoc(userRef);
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ email: string; token: string; id: string }>,
    ) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserToFirestore.fulfilled, (state, action) => {
        console.log('Пользователь успешно сохранен в Firestore');
      })
      .addCase(removeUserFromFirestore.fulfilled, (state, action) => {
        console.log('Пользователь успешно удален из Firestore');
      });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
 