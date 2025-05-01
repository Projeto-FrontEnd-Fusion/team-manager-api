export class HardSkillAlreadyRegister extends Error {
  constructor(name: string) {
    super(`Hard Skill with name ${name} already registered.`);
    this.name = 'HardSkillAlreadyRegister';
  }
}
