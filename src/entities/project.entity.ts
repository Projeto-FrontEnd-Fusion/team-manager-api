import { MemberEntity } from './member.entity';

export type ProjectEntity = {
  id: string;
  name: string;
  cover?: string;
  description: string;
  technologies: string[];
  url: string;
  members: Partial<MemberEntity>[];
  createdAt: string;
};
