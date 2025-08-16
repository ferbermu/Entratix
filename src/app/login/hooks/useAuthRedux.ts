import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loginUser,
  logoutUser,
  verifyUserToken,
  checkInitialAuth,
  clearError,
} from '../../store/slices/authSlice';

export const useAuthRedux = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Estado del store
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    state => state.auth
  );

  // Verificar autenticación inicial
  useEffect(() => {
    dispatch(checkInitialAuth());
  }, [dispatch]);

  // Función para hacer login
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await dispatch(loginUser({ email, password })).unwrap();

        // Redirigir al usuario después del login exitoso
        router.push('/');

        return result;
      } catch (error) {
        throw error;
      }
    },
    [dispatch, router]
  );

  // Función para hacer logout
  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push('/login');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }, [dispatch, router]);

  // Función para verificar token
  const verifyToken = useCallback(async () => {
    try {
      const result = await dispatch(verifyUserToken()).unwrap();
      return result;
    } catch (error) {
      console.error('Error verificando token:', error);
      return { valid: false };
    }
  }, [dispatch]);

  // Función para limpiar errores
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    verifyToken,
    clearError: clearAuthError,
  };
};
