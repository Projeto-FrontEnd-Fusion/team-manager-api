import { Member } from "../schema/Member";

export class ResponseMember {
  id: string;
  name: string;
  stack: string;
  communityLevel: string;
  currentSquad: string;
  skills: string[];
  softSkills: string[];

  constructor(id: string, member: Member) {
    this.id = id;
    this.name = member.name;
    this.stack = member.stack;
    this.communityLevel = member.communityLevel;
    this.currentSquad = member.currentSquad;
    this.skills = member.skills;
    this.softSkills = member.softSkills;
  }
}

