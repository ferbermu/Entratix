import { useAuthContext } from '../contexts/AuthContext';

/**
 * Hook para acceder al estado de autenticación global
 * Este hook debe ser usado dentro de un AuthProvider
 */
export const useAuthState = () => {
  const auth = useAuthContext();

  return {
    // Estado de autenticación
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,

    // Acciones de autenticación
    login: auth.login,
    logout: auth.logout,
    verifyToken: auth.verifyToken,

    // Utilidades
    isUser: auth.user?.role === 'user',
    isProducer: auth.user?.role === 'producer',
    isAdmin: auth.user?.role === 'admin',
    hasRole: (role: string) => auth.user?.role === role,
    hasAnyRole: (roles: string[]) => roles.includes(auth.user?.role || ''),

    // Información del usuario
    userName: auth.user?.name || '',
    userEmail: auth.user?.email || '',
    userId: auth.user?.id,
    tenantId: auth.user?.tenantId,
  };
};
