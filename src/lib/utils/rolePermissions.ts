// Tipos de roles disponibles
export type UserRole = 'user' | 'productor' | 'rrpp' | 'superuser';

// Definición de permisos por rol
export const ROLE_PERMISSIONS = {
  user: {
    canAccessHome: true,
    canAccessProfile: true,
    canAccessMyTickets: true,
    canAccessEvents: true,
    canCreateEvent: false,
    canAccessRrppDashboard: false,
  },
  productor: {
    canAccessHome: true,
    canAccessProfile: true,
    canAccessMyTickets: true,
    canAccessEvents: true,
    canCreateEvent: true,
    canAccessRrppDashboard: false,
  },
  rrpp: {
    canAccessHome: true,
    canAccessProfile: true,
    canAccessMyTickets: true,
    canAccessEvents: true,
    canCreateEvent: false,
    canAccessRrppDashboard: true,
  },
  superuser: {
    canAccessHome: true,
    canAccessProfile: true,
    canAccessMyTickets: true,
    canAccessEvents: true,
    canCreateEvent: true,
    canAccessRrppDashboard: true,
  },
} as const;

// Función para verificar si un rol tiene un permiso específico
export function hasPermission(
  role: UserRole | undefined,
  permission: keyof typeof ROLE_PERMISSIONS.user
): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.[permission] ?? false;
}

// Función para obtener todos los permisos de un rol
export function getRolePermissions(role: UserRole | undefined) {
  if (!role) return ROLE_PERMISSIONS.user;
  return ROLE_PERMISSIONS[role] ?? ROLE_PERMISSIONS.user;
}

// Función para verificar si un usuario puede acceder a una ruta
export function canAccessRoute(role: UserRole | undefined, route: string): boolean {
  if (!role) return route === '/' || route.startsWith('/events') || route === '/login' || route === '/register';

  const permissions = getRolePermissions(role);

  if (route === '/' || route.startsWith('/home')) return permissions.canAccessHome;
  if (route.startsWith('/profile')) return permissions.canAccessProfile;
  if (route.startsWith('/my-tickets')) return permissions.canAccessMyTickets;
  if (route.startsWith('/events')) return permissions.canAccessEvents;
  if (route.startsWith('/create-event')) return permissions.canCreateEvent;
  if (route.startsWith('/rrpp-dashbord')) return permissions.canAccessRrppDashboard;

  // Por defecto, permitir acceso a rutas públicas
  return true;
}

// Función para obtener el nombre legible del rol
export function getRoleName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    user: 'Usuario',
    productor: 'Productor',
    rrpp: 'RRPP',
    superuser: 'Super Usuario',
  };
  return roleNames[role];
}

// Función para obtener la ruta de redirección por defecto según el rol
export function getDefaultRouteForRole(role: UserRole): string {
  switch (role) {
    case 'superuser':
      return '/create-event';
    case 'productor':
      return '/create-event';
    case 'rrpp':
      return '/rrpp-dashbord';
    case 'user':
    default:
      return '/';
  }
}

