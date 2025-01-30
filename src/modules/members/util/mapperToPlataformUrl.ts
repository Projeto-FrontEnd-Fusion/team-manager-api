import { Member } from '../schema/Member';
import { ProfissionalProfileResponse } from '../dto/ProfileResponse.dto';

export function mapperProfissionalProfileToPlatformUrl(
  member: Member,
): ProfissionalProfileResponse[] {
  // Usando map para combinar plataformas e URLs
  return member.platform.map((platform, index) => ({
    platform,
    url: member.professionalProfile[index] || '', // Garante que haja uma URL associada
  }));
}
