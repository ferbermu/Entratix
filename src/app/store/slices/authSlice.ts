import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserAction,
  verifySessionAction,
  logoutUserAction,
  type AuthResponse,
} from '../../actions/auth';

// Tipos de usuario
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

// Estado inicial
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Thunk para login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginUserDto, { rejectWithValue }) => {
    try {
      const response = await loginUserAction(credentials);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error en el login');
      }

      // Guardar token en localStorage
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }

      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error en el login';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk para verificar token
export const verifyUserToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return rejectWithValue('No hay token');
      }

      const response = await verifySessionAction(token);
      
      if (!response.success) {
        localStorage.removeItem('authToken');
        return rejectWithValue(response.message || 'Token inválido');
      }

      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error verificando token';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk para logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        await logoutUserAction(token);
      }
      
      localStorage.removeItem('authToken');
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error en el logout';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk para verificar autenticación inicial
export const checkInitialAuth = createAsyncThunk(
  'auth/checkInitialAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');

      if (token) {
        const verification = await verifySessionAction(token);
        if (verification.success && verification.user) {
          return verification;
        } else {
          // Token inválido, limpiar
          localStorage.removeItem('authToken');
          throw new Error('Token inválido');
        }
      }
      throw new Error('No hay usuario autenticado');
    } catch (error: unknown) {
      // Limpiar estado en caso de error
      localStorage.removeItem('authToken');
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error verificando autenticación';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Verificar token
    builder
      .addCase(verifyUserToken.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUserToken.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success && action.payload.user) {
          state.user = action.payload.user;
          state.token = action.payload.token || null;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
        state.error = null;
      })
      .addCase(verifyUserToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Verificar autenticación inicial
    builder
      .addCase(checkInitialAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkInitialAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkInitialAuth.rejected, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
