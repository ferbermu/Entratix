import { useAppSelector } from '../store/hooks';

/**
 * Hook para acceder al estado de autenticación global usando Redux
 * Este hook debe ser usado dentro de un Redux Provider
 */
export const useAuthState = () => {
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    state => state.auth
  );

  return {
    // Estado de autenticación
    user,
    isAuthenticated,
    isLoading,
    error,

    // Acciones de autenticación (estas se manejan a través de useAuthRedux)
    // login: auth.login,
    // logout: auth.logout,
    // verifyToken: auth.verifyToken,

    // Utilidades
    isUser: user?.role === 'user',
    isProducer: user?.role === 'producer',
    isAdmin: user?.role === 'admin',
    hasRole: (role: string) => user?.role === role,
    hasAnyRole: (roles: string[]) => roles.includes(user?.role || ''),

    // Información del usuario
    userName: user?.name || '',
    userEmail: user?.email || '',
    userId: user?.id,
    tenantId: user?.tenantId,
  };
};
