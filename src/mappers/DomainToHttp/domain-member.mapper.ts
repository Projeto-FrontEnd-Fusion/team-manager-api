import { HttpMemberEntity, MemberEntity } from 'src/entities';
import { DomainProfessionalProfileMapper } from './domain-professional-profile.mapper';
import { DomainProjectMapper } from './domain-project.mapper';

export class DomainMemberMapper {
  static toDomain(member: HttpMemberEntity): MemberEntity {
    try {
      return {
        id: member.id,
        name: member.name,
        profileImage: member.profile_image,
        stack: member.stack,
        communityLevel: member.community_level,
        createdAt: member.created_at,
        updatedAt: member.updated_at,
        professionalProfiles:
          member.professional_profiles && member.professional_profiles.length > 0
            ? DomainProfessionalProfileMapper.ArrayToDomain(member.professional_profiles)
            : [],
        skills: (member.skills && member.skills) || [],
        projects:
          member.projects && member.projects.length > 0
            ? DomainProjectMapper.ArrayToDomain(member.projects)
            : [],
      };
    } catch (error) {
      console.error('Erro na transformação da requisição.');
      throw new Error(error);
    }
  }

  static ArrayToDomain(members: HttpMemberEntity[]): MemberEntity[] | [] {
    if (members.length === 0) return [];

    return members.map((member) => this.toDomain(member));
  }
}
