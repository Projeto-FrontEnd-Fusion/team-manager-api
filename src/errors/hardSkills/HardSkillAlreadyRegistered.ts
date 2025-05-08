import { HttpStatus } from '@nestjs/common';

export class HardSkillAlreadyRegister extends Error {
  statusCode?: number;
  constructor(name: string) {
    super(`Hard Skill with name ${name} already registered.`);
    this.name = 'HardSkillAlreadyRegister';
    this.statusCode = 404;
  }
}
