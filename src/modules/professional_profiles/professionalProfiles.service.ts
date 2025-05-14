import { PrismaService } from "@infra/database/prisma/helpers/prisma.service";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ProfessionalProfileService {
  private readonly logger = new Logger(ProfessionalProfileService.name);
  constructor(private readonly prismaService: PrismaService) { }

  async findManyProfiles() {
    return await this.prismaService.professionalProfile.findMany();
  }

  async findManyProfilesByMemberId(memberId: string) {
    return await this.prismaService.professionalProfile.findMany({
      where: { memberId: memberId },
    })
  }
};
