import { Member } from "../schema/Member";
import { mapperToPlatformUrl } from "../util/mapperToPlataformUrl";
import { ProfissionalProfileResponse } from "./ProfileResponse.dto";

export class ResponseMember {
  id: string;
  name: string;
  stack: string;
  professional_profile_url: ProfissionalProfileResponse[];
  community_level: string;
  current_squad: string;
  skills: string[];
  soft_skills: string[];

  constructor(id: string, member: Member) {
    this.id = id;
    this.name = member.name;
    this.stack = member.stack;
    this.community_level = member.communityLevel;
    this.professional_profile_url = mapperToPlatformUrl(member)
    this.current_squad = member.currentSquad;
    this.skills = member.skills;
    this.soft_skills = member.softSkills;
  }
}

