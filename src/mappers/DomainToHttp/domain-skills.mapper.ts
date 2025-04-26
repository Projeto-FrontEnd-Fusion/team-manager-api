import { HardSkillsEntity, HttpHardSkillEntity } from 'src/entities';

export class DomainSkillsMapper {
  static toDomain(skill: HttpHardSkillEntity): HardSkillsEntity {
    return {
      id: skill.id,
      name: skill.name,
      createdAt: skill.created_at,
    };
  }

  static ArrayToDomain(skills: HttpHardSkillEntity[]): HardSkillsEntity[] | [] {
    if (skills.length === 0) return [];

    return skills.map((skill) => this.toDomain(skill));
  }
}
