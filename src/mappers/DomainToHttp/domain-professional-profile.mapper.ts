import {
  HttpProfessionalProfileEntity,
  ProfessionalProfileEntity,
} from 'src/entities';

export class DomainProfessionalProfileMapper {
  static toDomain(
    professionalProfile: HttpProfessionalProfileEntity,
  ): ProfessionalProfileEntity {
    return {
      id: professionalProfile.id,
      url: professionalProfile.url,
      platform: professionalProfile.platform,
      memberId: professionalProfile.member_id,
      createdAt: professionalProfile.created_at,
    };
  }

  static ArrayToDomain(
    professionalProfiles: HttpProfessionalProfileEntity[],
  ): ProfessionalProfileEntity[] | [] {
    if (professionalProfiles.length === 0) return [];

    return professionalProfiles.map((professionalProfile) =>
      this.toDomain(professionalProfile),
    );
  }
}
