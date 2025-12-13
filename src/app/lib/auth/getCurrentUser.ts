import 'server-only';

import { eq } from 'drizzle-orm';
import { db } from '../../../lib/db';
import { users } from '../../../lib/db/schema/users';
import { AuthUser } from '../../auth/interfaces/AuthUser/AuthUser';
import { getSessionUserId } from './session';

function mapDbUserToAuthUser(user: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  birthDate: string | null;
  role: string;
  profileImageUrl: string | null;
  bio: string | null;
}): AuthUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    birthDate: user.birthDate,
    role: user.role,
    profileImageUrl: user.profileImageUrl,
    bio: user.bio,
  };
}

export async function getCurrentUserFromSession(): Promise<AuthUser | null> {
  const userId = await getSessionUserId();
  if (!userId) return null;

  const [user] = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phone: users.phone,
      birthDate: users.birthDate,
      role: users.role,
      profileImageUrl: users.profileImageUrl,
      bio: users.bio,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) return null;
  return mapDbUserToAuthUser(user);
}


