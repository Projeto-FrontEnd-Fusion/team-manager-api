import {
  HttpProfessionalProfileEntity,
  ProfessionalProfileEntity,
} from './professional-profiles.entity';
import { HttpProjectEntity, ProjectEntity } from './project.entity';
import { HttpSkillEntity, SkillsEntity } from './skills.entity';
import { SoftSkillsEntity } from './soft-skills.entity';

export type MemberEntity = {
  id: string;
  name: string;
  stack: string;
  communityLevel: string;
  currentSquad?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt?: string;
  skills?: SkillsEntity[] | [];
  softSkills?: SoftSkillsEntity[] | [];
  professionalProfiles?: ProfessionalProfileEntity[] | [];
  projects?: ProjectEntity[] | [];
};

export type HttpMemberEntity = {
  id: string;
  name: string;
  profile_image?: string;
  stack: string;
  community_level: string;
  created_at: string;
  updated_at?: string;
  professional_profiles: HttpProfessionalProfileEntity[];
  skills: HttpSkillEntity[];
  projects: HttpProjectEntity[];
};
