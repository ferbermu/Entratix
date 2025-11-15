'use server';

import { db } from '../../lib/db';
import { users, sessions } from '../../lib/db/schema/users';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

// Tipos para las operaciones de autenticación
export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthDate?: Date;
  password: string;
  receiveUpdates?: boolean;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  token?: string;
};

// Función para generar un token de sesión
function generateSessionToken(): string {
  return randomBytes(32).toString('hex');
}

// Función para calcular fecha de expiración (7 días)
function getExpirationDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
}

/**
 * Registrar un nuevo usuario
 */
export async function registerUserAction(
  input: RegisterInput
): Promise<AuthResponse> {
  try {
    const { firstName, lastName, email, phone, birthDate, password, receiveUpdates } = input;

    // Validar que el email no exista
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        success: false,
        message: 'Este email ya está registrado',
      };
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear el usuario
    const [newUser] = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email: email.toLowerCase(),
        phone: phone || null,
        birthDate: birthDate || null,
        passwordHash,
        receiveUpdates: receiveUpdates || false,
      })
      .returning();

    // Generar token de sesión
    const token = generateSessionToken();
    const expiresAt = getExpirationDate();

    await db.insert(sessions).values({
      userId: newUser.id,
      token,
      expiresAt,
    });

    return {
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      message: 'Error al registrar el usuario',
    };
  }
}

/**
 * Iniciar sesión
 */
export async function loginUserAction(input: LoginInput): Promise<AuthResponse> {
  try {
    const { email, password } = input;

    // Buscar el usuario por email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      return {
        success: false,
        message: 'Email o contraseña incorrectos',
      };
    }

    // Verificar que el usuario esté activo
    if (!user.isActive) {
      return {
        success: false,
        message: 'Esta cuenta ha sido desactivada',
      };
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Email o contraseña incorrectos',
      };
    }

    // Generar nuevo token de sesión
    const token = generateSessionToken();
    const expiresAt = getExpirationDate();

    await db.insert(sessions).values({
      userId: user.id,
      token,
      expiresAt,
    });

    return {
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      success: false,
      message: 'Error al iniciar sesión',
    };
  }
}

/**
 * Verificar sesión por token
 */
export async function verifySessionAction(token: string): Promise<AuthResponse> {
  try {
    // Buscar la sesión
    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.token, token))
      .limit(1);

    if (!session) {
      return {
        success: false,
        message: 'Sesión no válida',
      };
    }

    // Verificar que no haya expirado
    if (new Date() > session.expiresAt) {
      // Eliminar sesión expirada
      await db.delete(sessions).where(eq(sessions.id, session.id));
      return {
        success: false,
        message: 'Sesión expirada',
      };
    }

    // Obtener el usuario
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1);

    if (!user || !user.isActive) {
      return {
        success: false,
        message: 'Usuario no encontrado o inactivo',
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error('Error verifying session:', error);
    return {
      success: false,
      message: 'Error al verificar la sesión',
    };
  }
}

/**
 * Cerrar sesión
 */
export async function logoutUserAction(token: string): Promise<{ success: boolean }> {
  try {
    await db.delete(sessions).where(eq(sessions.token, token));
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false };
  }
}

