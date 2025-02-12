import { MemberEntity } from './member.entity';
import { SkillsEntity } from './skills.entity';

export type SoftSkillsEntity = {
  memberId: string;
  skillId: string;
  member: MemberEntity;
  skill: SkillsEntity;
};
