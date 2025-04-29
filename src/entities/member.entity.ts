import { HardSkillsEntity, HttpHardSkillEntity } from './hard-skills.entity';
import {
  HttpProfessionalProfileEntity,
  ProfessionalProfileEntity,
} from './professional-profiles.entity';
import { HttpProjectEntity, ProjectEntity } from './project.entity';
import { HttpSoftSkillsEntity, SoftSkillsEntity } from './soft-skills.entity';

export type MemberEntity = {
  id: string;
  name: string;
  stack: string;
  communityLevel: string;
  currentSquad?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt?: string;
  hardSkills?: HardSkillsEntity[] | [];
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
  hardSkills: HttpHardSkillEntity[];
  softSkills: HttpSoftSkillsEntity[];
  projects: HttpProjectEntity[];
};
