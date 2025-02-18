import { User } from '@prisma/client';
import { UserRolesEnum } from './user-roles.enum';

export type UserEntity = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  role: UserRolesEnum;
  createdAt: string;
};

export type PublicUserEntity = Omit<User, 'password'>;

export type HttpPublicUserEntity = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  role: UserRolesEnum;
  created_at: string;
};
