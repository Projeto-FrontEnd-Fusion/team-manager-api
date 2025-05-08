export class HardSkillNotFounded extends Error {
  statusCode: number;
  constructor(message?: string) {
    super(message ? message : 'Hard Skill not founded.');
    this.statusCode = 404; // Not Founded
  }
}
