'use server';

import { db } from '../../lib/db';
import { users } from '../../lib/db/schema/users';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput) {
  try {
    const { firstName, lastName, email, password, phone, birthDate } = input;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, message: 'Email already registered' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone: phone || null,
        birthDate: birthDate || null,
        role: 'user',
      })
      .returning();

    return {
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        birthDate: newUser.birthDate,
        role: newUser.role,
        profileImageUrl: newUser.profileImageUrl,
        bio: newUser.bio,
      },
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Failed to register user' };
  }
}

export async function loginUser(input: LoginInput) {
  try {
    const { email, password } = input;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { success: false, message: 'Invalid email or password' };
    }

    return {
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
        bio: user.bio,
      },
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Failed to login' };
  }
}

export async function getUserById(userId: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return {
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
        bio: user.bio,
        emailNotifications: user.emailNotifications,
        smsNotifications: user.smsNotifications,
        pushNotifications: user.pushNotifications,
        profileVisibility: user.profileVisibility,
        dataSharing: user.dataSharing,
      },
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, message: 'Failed to fetch user' };
  }
}

