'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthRedux } from '../login/hooks/useAuthRedux';
import { canAccessRoute, type UserRole } from '../../lib/utils/rolePermissions';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuthRedux();

  useEffect(() => {
    // Rutas públicas que no requieren autenticación
    const publicRoutes = ['/', '/login', '/register', '/events'];
    const isPublicRoute = publicRoutes.some(route => 
      pathname === route || (route === '/events' && pathname?.startsWith('/events'))
    );

    // Si la ruta es pública, permitir acceso
    if (isPublicRoute) {
      return;
    }

    // Si está cargando, esperar
    if (isLoading) {
      return;
    }

    // Si no está autenticado y la ruta no es pública, redirigir a login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Verificar permisos de rol
    const userRole = user?.role as UserRole | undefined;
    const hasAccess = canAccessRoute(userRole, pathname || '');

    if (!hasAccess) {
      // Redirigir a la página principal si no tiene acceso
      router.push('/');
    }
  }, [isAuthenticated, isLoading, pathname, router, user]);

  // Mostrar loading mientras se verifica
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1A1A]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3BAFBB]"></div>
          <p className="text-white text-lg">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
