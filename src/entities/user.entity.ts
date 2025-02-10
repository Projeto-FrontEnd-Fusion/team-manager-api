export enum UserRolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

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
