import { HardSkillsEntity, HttpHardSkillEntity } from 'src/entities';

export class HttpHardSkillsMapper {
  static toHttp(skill: HardSkillsEntity): HttpHardSkillEntity {
    return {
      id: skill.id,
      name: skill.name,
      created_at: skill.createdAt,
    };
  }

  static ArrayToHttp(skills: HardSkillsEntity[]): HttpHardSkillEntity[] {
    return skills.map((skill) => this.toHttp(skill));
  }
}
