export class UserNotFound extends Error {
  statusCode: number;
  constructor(message?: string) {
    super(message ? message : 'Usuário não encontrado.')
    this.statusCode = 404 // Not Found Error
  }
}