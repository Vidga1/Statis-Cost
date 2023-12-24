import { useAppSelector } from './redux-hooks';

export function useAuth() {
    const user = useAppSelector(state => state.user);
    const isAuth = !!user.token || !!localStorage.getItem('authToken');
    const email = user.email || localStorage.getItem('userEmail');

    return {
        isAuth,
        email,
        token: user.token,
        id: user.id,
    };
}