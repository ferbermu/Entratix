'use server';

import { db } from '../../lib/db';
import { users } from '../../lib/db/schema/users';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

interface UpdateProfileInput {
  userId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  bio?: string;
  profileImageUrl?: string;
}

interface UpdatePasswordInput {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

interface UpdateSettingsInput {
  userId: string;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  profileVisibility?: string;
  dataSharing?: boolean;
}

export async function updateUserProfile(input: UpdateProfileInput) {
  try {
    const { userId, ...updates } = input;

    const updateData: Record<string, string | null> = {};
    if (updates.firstName !== undefined) updateData.firstName = updates.firstName;
    if (updates.lastName !== undefined) updateData.lastName = updates.lastName;
    if (updates.phone !== undefined) updateData.phone = updates.phone || null;
    if (updates.birthDate !== undefined) updateData.birthDate = updates.birthDate || null;
    if (updates.bio !== undefined) updateData.bio = updates.bio || null;
    if (updates.profileImageUrl !== undefined) updateData.profileImageUrl = updates.profileImageUrl || null;

    const [updatedUser] = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) {
      return { success: false, message: 'User not found' };
    }

    return {
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        birthDate: updatedUser.birthDate,
        role: updatedUser.role,
        profileImageUrl: updatedUser.profileImageUrl,
        bio: updatedUser.bio,
      },
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, message: 'Failed to update profile' };
  }
}

export async function updateUserPassword(input: UpdatePasswordInput) {
  try {
    const { userId, currentPassword, newPassword } = input;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isValidPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db
      .update(users)
      .set({ password: hashedPassword, updatedAt: new Date() })
      .where(eq(users.id, userId));

    return {
      success: true,
      message: 'Password updated successfully',
    };
  } catch (error) {
    console.error('Error updating password:', error);
    return { success: false, message: 'Failed to update password' };
  }
}

export async function updateUserSettings(input: UpdateSettingsInput) {
  try {
    const { userId, ...settings } = input;

    const updateData: Record<string, boolean | string> = {};
    if (settings.emailNotifications !== undefined) updateData.emailNotifications = settings.emailNotifications;
    if (settings.smsNotifications !== undefined) updateData.smsNotifications = settings.smsNotifications;
    if (settings.pushNotifications !== undefined) updateData.pushNotifications = settings.pushNotifications;
    if (settings.profileVisibility !== undefined) updateData.profileVisibility = settings.profileVisibility;
    if (settings.dataSharing !== undefined) updateData.dataSharing = settings.dataSharing;

    const [updatedUser] = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) {
      return { success: false, message: 'User not found' };
    }

    return {
      success: true,
      message: 'Settings updated successfully',
      settings: {
        emailNotifications: updatedUser.emailNotifications,
        smsNotifications: updatedUser.smsNotifications,
        pushNotifications: updatedUser.pushNotifications,
        profileVisibility: updatedUser.profileVisibility,
        dataSharing: updatedUser.dataSharing,
      },
    };
  } catch (error) {
    console.error('Error updating settings:', error);
    return { success: false, message: 'Failed to update settings' };
  }
}

