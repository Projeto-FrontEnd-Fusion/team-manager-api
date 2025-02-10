import { ProfessionalProfileEntity } from './professional-profiles.entity';
import { ProjectEntity } from './project.entity';

export type MemberEntity = {
  id: string;
  name: string;
  stack: string;
  communityLevel: string;
  currentSquad: string;
  profileImage?: string;
  createdAt: string;
  updatedAt?: string;
  skills: string[];
  softSkills: string[];
  professionalProfiles: ProfessionalProfileEntity[];
  projects: ProjectEntity[];
};
