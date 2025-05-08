import { User } from '@prisma/client';
import { UserRoles } from 'src/types/RolesEnum';
import { HttpMemberEntity, MemberEntity } from './member.entity';

export type UserEntity = {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  member?: MemberEntity;
  token?: string;
};

export type PublicUserEntity = Omit<User, 'password'>;

export type HttpPublicUserEntity = {
  id: string;
  email: string;
  role: UserRoles;
  created_at: string;
  member?: HttpMemberEntity;
};
