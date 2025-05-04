import { UnauthorizedException } from "@nestjs/common";

export class UnauthorizedExceptionError extends UnauthorizedException {
  statusCode?: number;
  constructor(message?: string) {
    super(message ? message : 'Please provide a valid token.')
    this.statusCode = 401;
  }
};
