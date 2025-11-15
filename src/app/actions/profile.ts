'use server';

import { db } from '../../lib/db';
import { users } from '../../lib/db/schema/users';
import { orders, userTickets } from '../../lib/db/schema/orders';
import { eq, and, count } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

// Tipos para las operaciones
export type UpdateProfileInput = {
  userId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type UpdateSettingsInput = {
  userId: string;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  profileVisibility?: 'Public' | 'Private' | 'Friends Only';
  dataSharing?: boolean;
};

export type ChangePasswordInput = {
  userId: string;
  currentPassword: string;
  newPassword: string;
};

export type ProfileStats = {
  totalTickets: number;
  totalSpent: number;
  rating: number;
};

/**
 * Obtener información completa del perfil del usuario
 */
export async function getUserProfile(userId: string) {
  try {
    const [user] = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        phone: users.phone,
        birthDate: users.birthDate,
        role: users.role,
        emailNotifications: users.emailNotifications,
        smsNotifications: users.smsNotifications,
        pushNotifications: users.pushNotifications,
        profileVisibility: users.profileVisibility,
        dataSharing: users.dataSharing,
        emailVerified: users.emailVerified,
        receiveUpdates: users.receiveUpdates,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return {
        success: false,
        message: 'Usuario no encontrado',
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {
      success: false,
      message: 'Error al obtener el perfil del usuario',
    };
  }
}

/**
 * Obtener estadísticas del perfil del usuario
 */
export async function getUserProfileStats(userId: string): Promise<ProfileStats> {
  try {
    // Total de tickets
    const [ticketCount] = await db
      .select({ count: count() })
      .from(userTickets)
      .where(eq(userTickets.userId, userId));

    // Total gastado
    const userOrders = await db
      .select({ total: orders.total })
      .from(orders)
      .where(
        and(
          eq(orders.userId, userId),
          eq(orders.status, 'completed')
        )
      );

    const totalSpent = userOrders.reduce(
      (sum, order) => sum + parseFloat(order.total),
      0
    );

    // Rating (por ahora hardcodeado, se puede implementar un sistema de reviews)
    const rating = 4.8;

    return {
      totalTickets: ticketCount.count,
      totalSpent: Math.round(totalSpent * 100) / 100,
      rating,
    };
  } catch (error) {
    console.error('Error fetching user profile stats:', error);
    return {
      totalTickets: 0,
      totalSpent: 0,
      rating: 0,
    };
  }
}

/**
 * Actualizar información personal del perfil
 */
export async function updateUserProfile(input: UpdateProfileInput) {
  try {
    const { userId, firstName, lastName, phone } = input;

    // Construir objeto de actualización solo con campos definidos
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) updateData.phone = phone;

    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        phone: users.phone,
      });

    if (!updatedUser) {
      return {
        success: false,
        message: 'Usuario no encontrado',
      };
    }

    return {
      success: true,
      message: 'Perfil actualizado exitosamente',
      user: updatedUser,
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {
      success: false,
      message: 'Error al actualizar el perfil',
    };
  }
}

/**
 * Actualizar configuración y preferencias del usuario
 */
export async function updateUserSettings(input: UpdateSettingsInput) {
  try {
    const {
      userId,
      emailNotifications,
      smsNotifications,
      pushNotifications,
      profileVisibility,
      dataSharing,
    } = input;

    // Construir objeto de actualización solo con campos definidos
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (emailNotifications !== undefined)
      updateData.emailNotifications = emailNotifications;
    if (smsNotifications !== undefined)
      updateData.smsNotifications = smsNotifications;
    if (pushNotifications !== undefined)
      updateData.pushNotifications = pushNotifications;
    if (profileVisibility !== undefined)
      updateData.profileVisibility = profileVisibility;
    if (dataSharing !== undefined) updateData.dataSharing = dataSharing;

    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        emailNotifications: users.emailNotifications,
        smsNotifications: users.smsNotifications,
        pushNotifications: users.pushNotifications,
        profileVisibility: users.profileVisibility,
        dataSharing: users.dataSharing,
      });

    if (!updatedUser) {
      return {
        success: false,
        message: 'Usuario no encontrado',
      };
    }

    return {
      success: true,
      message: 'Configuración actualizada exitosamente',
      settings: updatedUser,
    };
  } catch (error) {
    console.error('Error updating user settings:', error);
    return {
      success: false,
      message: 'Error al actualizar la configuración',
    };
  }
}

/**
 * Cambiar contraseña del usuario
 */
export async function changeUserPassword(input: ChangePasswordInput) {
  try {
    const { userId, currentPassword, newPassword } = input;

    // Obtener usuario con password hash
    const [user] = await db
      .select({
        id: users.id,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return {
        success: false,
        message: 'Usuario no encontrado',
      };
    }

    // Verificar contraseña actual
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'La contraseña actual es incorrecta',
      };
    }

    // Validar nueva contraseña
    if (newPassword.length < 8) {
      return {
        success: false,
        message: 'La nueva contraseña debe tener al menos 8 caracteres',
      };
    }

    // Hash de la nueva contraseña
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    await db
      .update(users)
      .set({
        passwordHash: newPasswordHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    return {
      success: true,
      message: 'Contraseña actualizada exitosamente',
    };
  } catch (error) {
    console.error('Error changing user password:', error);
    return {
      success: false,
      message: 'Error al cambiar la contraseña',
    };
  }
}

