import { HttpStatus } from '@nestjs/common';

export class HardSkillAlreadyRegister extends Error {
  statusCode: number;
  constructor(message?: string, name?: string) {
    super(
      message ? message : `Hard Skill with name ${name} already registered.`,
    );
    this.name = 'HardSkillAlreadyRegister';
    this.statusCode = 409; // Conflito
  }
}
