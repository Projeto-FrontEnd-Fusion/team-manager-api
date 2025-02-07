import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member } from '@entity/Member';
import { Project } from '@entity/Project';

@Injectable()
export class MemberProjectService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async deleteMemberFromProject(memberId: string, projectId: string) {
    const member = await this.memberRepository.findOne({
      where: { id: memberId },
      relations: ['project'],
    });
    if (!member) throw new NotFoundException('Membro não encontrado');

    member.projects = member.projects.filter((p) => p.id !== projectId);

    await this.memberRepository.save(member);
  }
}
