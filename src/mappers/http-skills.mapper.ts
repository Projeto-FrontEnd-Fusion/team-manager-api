import { HttpSkillEntity, SkillsEntity } from 'src/entities';

export class HttpSkillsMapper {
  static toHttp(skill: SkillsEntity): HttpSkillEntity {
    return {
      id: skill.id,
      name: skill.name,
      created_at: skill.createdAt,
    };
  }

  static ArrayToHttp(skills: SkillsEntity[]): HttpSkillEntity[] {
    return skills.map((skill) => this.toHttp(skill));
  }
}
