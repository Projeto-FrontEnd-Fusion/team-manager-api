export class ProjectNotFound extends Error {
  statusCode: number;
  constructor(message?: string) {
    super(message ? message : 'Projeto não encontrado.');
    this.statusCode = 404 // Not Found
  }
}