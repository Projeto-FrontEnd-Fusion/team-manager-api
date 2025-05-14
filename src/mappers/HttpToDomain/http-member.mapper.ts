import { HttpMemberEntity, MemberEntity } from 'src/entities';
import { HttpHardSkillsMapper } from './http-hard-skills.mapper';
import { HttpProfessionalProfileMapper } from './http-professional-profile.mapper';
import { HttpProjectMapper } from './http-project.mapper';
import { HttpSoftSkillsMapper } from './http-soft-skills.mapper';
import { DomainMemberEntity } from 'src/entities/member.entity';

export class HttpMemberMapper {
  static toHttp(member: DomainMemberEntity): HttpMemberEntity {
    return {
      id: member.id,
      name: member.name,
      user_id: member.userId,
      profile_image: member.profileImage,
      stack: member.stack,
      community_level: member.communityLevel,
      created_at: member.createdAt,
      updated_at: member.updatedAt,
      professional_profiles:
        member.professionalProfiles &&
        HttpProfessionalProfileMapper.ArrayToHttp(member.professionalProfiles),
      hardSkills:
        member.HardSkillsMembers &&
        HttpHardSkillsMapper.ArrayToHttp(member.HardSkillsMembers),
      softSkills:
        member.SoftSkillsMembers &&
        HttpSoftSkillsMapper.ArrayToHttp(member.SoftSkillsMembers),
      projects:
        member.projects && HttpProjectMapper.ArrayToHttp(member.projects),
    };
  }

  static ArrayToHttp(members: MemberEntity[]): HttpMemberEntity[] | [] {
    if (members.length === 0) return [];
    return members.map((member) => this.toHttp(member));
  }
}
