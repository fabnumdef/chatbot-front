import { UserRole } from '@enum/user-role.enum';

export class User {
  email: string;
  firstName: string;
  lastName: string;

  role: UserRole;
  createdAt: string;
}
