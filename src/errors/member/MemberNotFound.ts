export class MemberNotFound extends Error {
  statusCode: number;
  constructor(message?: string) {
    super(message ? message : 'Membro não encontrado.');
    this.statusCode = 404; // Not Founded
  };
};
