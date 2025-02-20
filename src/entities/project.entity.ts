import { MemberEntity } from './member.entity';

export type ProjectEntity = {
  id: string;
  name: string;
  cover?: string;
  description: string;
  technologies: string;
  url: string;
  members?: Partial<MemberEntity>[];
  createdAt: string;
};

export type HttpMemberInProjectEntity = {
  id: string;
  name: string;
};

export type HttpProjectEntity = {
  id: string;
  project_cover: string;
  project_name: string;
  description: string;
  technologies: string[];
  members: Partial<HttpMemberInProjectEntity>[];
  projectUrl: string;
};
