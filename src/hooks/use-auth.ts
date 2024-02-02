import { useAppSelector } from './redux-hooks';

export function useAuth() {
  const user = useAppSelector((state) => state.user);
  const isAuth = !!user.token;

  return {
    isAuth,
    email: user.email,
    token: user.token,
    id: user.id,
  };
}
