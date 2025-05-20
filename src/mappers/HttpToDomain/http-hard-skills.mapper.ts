import { HardSkillsEntity, HttpHardSkillEntity } from 'src/entities';

export class HttpHardSkillsMapper {
  static toHttp({ hardSkill }: { hardSkill: HardSkillsEntity }): HttpHardSkillEntity {
    return {
      id: hardSkill.id,
      name: hardSkill.name,
      created_at: hardSkill.createdAt,
    };
  }

  static ArrayToHttp(hardSkills: { hardSkill: HardSkillsEntity }[] | []): HttpHardSkillEntity[] | [] {
    if (hardSkills.length === 0) return [];
    return hardSkills.map((hardSkill) => this.toHttp(hardSkill));
  }
}
