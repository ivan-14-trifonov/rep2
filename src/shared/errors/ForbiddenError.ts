export class ForbiddenError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'Forbidden error';
    this.code = 'FORBIDDEN';
  }
}
