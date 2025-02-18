import { MemberEntity } from './member.entity';
import { HttpSkillEntity, SkillsEntity } from './skills.entity';

export type ProjectEntity = {
  id: string;
  name: string;
  cover?: string;
  description: string;
  technologies: SkillsEntity[];
  url: string;
  members: Partial<MemberEntity>[];
  createdAt: string;
};

export type HttpProjectEntity = {
  id: string;
  project_cover: string;
  project_name: string;
  description: string;
  technologies: HttpSkillEntity[];
  projectUrl: string;
};
