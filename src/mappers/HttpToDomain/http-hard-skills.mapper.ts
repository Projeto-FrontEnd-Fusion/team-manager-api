import { HardSkillsEntity, HttpHardSkillEntity } from 'src/entities';

export class HttpHardSkillsMapper {
  static toHttp(skill: HardSkillsEntity): HttpHardSkillEntity {
    return {
      id: skill.id,
      name: skill.name,
      created_at: skill.createdAt,
    };
  }

  static ArrayToHttp(skills: HardSkillsEntity[]): HttpHardSkillEntity[] | [] {
    if (skills.length === 0) return [];
    return skills.map((skill) => this.toHttp(skill));
  }
}
