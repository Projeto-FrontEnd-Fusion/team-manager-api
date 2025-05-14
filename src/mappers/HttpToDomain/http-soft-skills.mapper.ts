import { SoftSkillsEntity, HttpSoftSkillsEntity } from 'src/entities';

export class HttpSoftSkillsMapper {
  static toHttp({ softSkill }: { softSkill: SoftSkillsEntity }): HttpSoftSkillsEntity {
    return {
      id: softSkill.id,
      name: softSkill.name,
      created_at: softSkill.createdAt,
    };
  }

  static ArrayToHttp(softSkills: { softSkill: SoftSkillsEntity }[] | []): HttpSoftSkillsEntity[] | [] {
    if (softSkills.length === 0) return [];
    return softSkills.map((softSkill) => this.toHttp(softSkill));
  }
}
