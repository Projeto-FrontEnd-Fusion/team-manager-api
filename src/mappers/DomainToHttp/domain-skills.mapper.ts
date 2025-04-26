import { HttpSkillEntity, SkillsEntity } from 'src/entities';

export class DomainSkillsMapper {
  static toDomain(skill: HttpSkillEntity): SkillsEntity {
    return {
      id: skill.id,
      name: skill.name,
      createdAt: skill.created_at,
    };
  }

  static ArrayToDomain(skills: HttpSkillEntity[]): SkillsEntity[] | [] {
    if (skills.length === 0) return [];

    return skills.map((skill) => this.toDomain(skill));
  }
}
