import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MemberProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteMemberFromProject(memberId: string, projectId: string) {
    const member = await this.prismaService.member.findFirst({
      where: { id: memberId },
      include: { projects: true },
    });
    if (!member) throw new NotFoundException('Membro não encontrado');

    member.projects = member.projects.filter((p) => p.id !== projectId);
  }
}
