export class SoftSkillNotFounded extends Error {
  statusCode: number;
  constructor(message?: string) {
    super(message ? message : 'Soft Skill not founded.')
    this.statusCode = 404 // Not founded
  }
};
