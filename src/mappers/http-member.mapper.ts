import { HttpMemberEntity, MemberEntity } from 'src/entities';
import { HttpProjectMapper } from './http-project.mapper';
import { HttpSkillsMapper } from './http-skills.mapper';
import { HttpProfessionalProfileMapper } from './http-professional-profile.mapper';

export class HttpMemberMapper {
  static toHttp(member: MemberEntity): HttpMemberEntity {
    return {
      id: member.id,
      name: member.name,
      profile_image: member.profileImage,
      // TODO: currentSquad não está sendo utilizado no frontend
      // current_squad: member.currentSquad,
      stack: member.stack,
      community_level: member.communityLevel,
      professional_profile: HttpProfessionalProfileMapper.ArrayToHttp(
        member.professionalProfiles,
      ),
      skills: HttpSkillsMapper.ArrayToHttp(member.skills),
      projects: HttpProjectMapper.ArrayToHttp(member.projects),
      created_at: member.createdAt,
      updated_at: member.updatedAt,
    };
  }

  static ArrayToHttp(members: MemberEntity[]): HttpMemberEntity[] {
    return members.map((member) => this.toHttp(member));
  }
}
