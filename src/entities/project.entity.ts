import { HttpMemberEntity } from './member.entity';

export type ProjectEntity = {
  id: string;
  name: string;
  cover?: string;
  description: string;
  technologies: string[];
  url: string;
  members?: HttpMemberEntity[] | { id: string }[] | string[];
  createdAt: string;
  updatedAt?: string;
};

export type HttpMemberInProjectEntity = {
  id: string;
  name: string;
};

export type HttpProjectEntity = {
  id: string;
  name: string;
  cover: string;
  description: string;
  technologies: string[];
  members?: HttpMemberEntity[] | { id: string }[] | string[];
  url: string;
  created_at: string;
  updated_at?: string;
};
