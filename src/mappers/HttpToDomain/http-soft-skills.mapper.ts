import { SoftSkillsEntity, HttpSoftSkillsEntity } from 'src/entities';

export class HttpSoftSkillsMapper {
  static toHttp(skill: SoftSkillsEntity): HttpSoftSkillsEntity {
    return {
      id: skill.id,
      name: skill.name,
      created_at: skill.createdAt,
    };
  }

  static ArrayToHttp(skills: SoftSkillsEntity[]): HttpSoftSkillsEntity[] | [] {
    if (skills.length === 0) return [];
    return skills.map((skill) => this.toHttp(skill));
  }
}
