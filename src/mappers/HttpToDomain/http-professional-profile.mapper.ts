import {
  HttpProfessionalProfileEntity,
  ProfessionalProfileEntity,
} from 'src/entities';

export class HttpProfessionalProfileMapper {
  static toHttp(
    professionalProfile: ProfessionalProfileEntity,
  ): HttpProfessionalProfileEntity {
    return {
      id: professionalProfile.id,
      url: professionalProfile.url,
      platform: professionalProfile.platform,
      member_id: professionalProfile.memberId,
      created_at: professionalProfile.createdAt,
    };
  }

  static ArrayToHttp(professionalProfiles: ProfessionalProfileEntity[]): HttpProfessionalProfileEntity[] | [] {
    if (professionalProfiles.length === 0) return [];

    return professionalProfiles.map((professionalProfile) =>
      this.toHttp(professionalProfile),
    );
  }
}
