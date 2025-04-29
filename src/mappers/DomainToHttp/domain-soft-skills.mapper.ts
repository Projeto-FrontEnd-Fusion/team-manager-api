import { SoftSkillsEntity, HttpSoftSkillsEntity } from 'src/entities';

export class DomainSoftSkillsMapper {
  static toDomain(skill: HttpSoftSkillsEntity): SoftSkillsEntity {
    return {
      id: skill.id,
      name: skill.name,
      createdAt: skill.created_at,
    };
  }

  static ArrayToDomain(skills: HttpSoftSkillsEntity[]): SoftSkillsEntity[] | [] {
    if (skills.length === 0) return [];

    return skills.map((skill) => this.toDomain(skill));
  }
}
