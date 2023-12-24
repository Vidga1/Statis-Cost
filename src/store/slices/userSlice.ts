import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ email: string; token: string; id: string }>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            // Сохраняем токен и email в локальное хранилище
            localStorage.setItem('authToken', action.payload.token);
            localStorage.setItem('userEmail', action.payload.email);
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            // Удаляем токен и email из локального хранилища
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
