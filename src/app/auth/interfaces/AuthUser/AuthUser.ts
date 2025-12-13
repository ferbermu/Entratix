export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  birthDate: string | null;
  role: string;
  profileImageUrl: string | null;
  bio: string | null;
}


