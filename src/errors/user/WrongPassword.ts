export class WrongPasswordError extends Error {
  constructor() {
    super('Wrong password error.');
    this.name = 'WrongPasswordError';
  }
}
