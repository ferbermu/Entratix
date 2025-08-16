export interface LoginUserDto {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  tenantId: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface VerifyResponse {
  valid: boolean;
  user?: User;
}

// Configuración de la API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class AuthService {
  private token: string | null = null;

  constructor() {
    // Intentar recuperar el token del localStorage al inicializar
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  // Método para establecer el token
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  // Método para obtener el token
  getToken(): string | null {
    return this.token;
  }

  // Método para limpiar el token
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Método para obtener el usuario actual
  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  // Método para establecer el usuario actual
  setCurrentUser(user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  // Método para limpiar el usuario actual
  clearCurrentUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  // Método para hacer login
  async login(credentials: LoginUserDto): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data: AuthResponse = await response.json();

      // Guardar el token y usuario en el servicio y localStorage
      this.setToken(data.token);
      this.setCurrentUser(data.user);

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // Método para verificar el token
  async verifyToken(): Promise<VerifyResponse> {
    if (!this.token) {
      return { valid: false };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Si el token no es válido, limpiar el estado
        this.clearToken();
        this.clearCurrentUser();
        return { valid: false };
      }

      const data: VerifyResponse = await response.json();

      if (data.valid && data.user) {
        // Actualizar el usuario actual
        this.setCurrentUser(data.user);
      } else {
        // Si el token no es válido, limpiar el estado
        this.clearToken();
        this.clearCurrentUser();
      }

      return data;
    } catch (error) {
      console.error('Error verificando token:', error);
      // En caso de error, limpiar el estado
      this.clearToken();
      this.clearCurrentUser();
      return { valid: false };
    }
  }

  // Método para hacer logout
  async logout(): Promise<void> {
    if (!this.token) {
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Siempre limpiar el estado local, independientemente del resultado del backend
      this.clearToken();
      this.clearCurrentUser();
    }
  }

  // Método para obtener headers de autorización
  getAuthHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }
}

// Exportar una instancia única del servicio
export const authService = new AuthService();
