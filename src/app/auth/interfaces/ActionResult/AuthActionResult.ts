import { AuthUser } from '../AuthUser/AuthUser';

export interface AuthActionResult {
  success: boolean;
  message: string;
  user?: AuthUser;
}


