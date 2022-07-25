export type UserRoles = 'admin' | 'user' | 'customer';

export interface User {
  username: string;
  password: string;
  fullName: string;
  roles: string[];
}
