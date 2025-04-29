import { SoftSkillsEntity, HttpSoftSkillsEntity } from 'src/entities';

export class HttpSoftSkillsMapper {
  static toHttp(skill: SoftSkillsEntity): HttpSoftSkillsEntity {
    return {
      id: skill.id,
      name: skill.name,
      created_at: skill.createdAt,
    };
  }

  static ArrayToHttp(skills: SoftSkillsEntity[]): HttpSoftSkillsEntity[] {
    return skills.map((skill) => this.toHttp(skill));
  }
}
