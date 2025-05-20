export class EmailAlreadyRegisteredError extends Error {
  constructor() {
    super(`This email is already beeing used.`);
    this.name = 'EmailAlreadyRegisteredError';
  }
}
