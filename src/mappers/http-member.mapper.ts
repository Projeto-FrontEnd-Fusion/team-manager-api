import { HttpMemberEntity, MemberEntity } from 'src/entities';
import { HttpProjectMapper } from './http-project.mapper';

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
      professional_profile_url: member.professionalProfiles,
      skills: member.skills,
      projects: member.projects.map((p) => {
        return HttpProjectMapper.toHttp(p);
      }),
    };
  }
}
