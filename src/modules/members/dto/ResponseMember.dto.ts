import { Member } from '../schema/Member';
import { ProfissionalProfileResponse } from './ProfileResponse.dto';
import { ResponseProjectDto } from 'src/modules/project/dto/ResponseProject.dto';
import { mapperToPlatformUrl } from '../util/mapperToPlataformUrl';

export class ResponseMember {
  id: string;
  name: string;
  profile_image: string;
  stack: string;
  professional_profile_url: ProfissionalProfileResponse[];
  community_level: string;
  current_squad: string;
  skills: string[];
  projects: ResponseProjectDto[];
  soft_skills: string[];

  constructor(member: Member) {
    this.id = member._id;
    this.name = member.name;
    this.profile_image = member.profileImage;
    this.stack = member.stack;
    this.community_level = member.communityLevel;
    this.professional_profile_url = mapperToPlatformUrl(member);
    this.current_squad = member.currentSquad;
    this.skills = member.skills;
    this.projects = member.projects.map((p) => new ResponseProjectDto(p));
    this.soft_skills = member.softSkills;
  }
}
