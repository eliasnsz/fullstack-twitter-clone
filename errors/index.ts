export class BaseError extends Error {
  statusCode: number

  constructor({
    message,
    statusCode,
  }: {
    message: string
    statusCode?: number
  }) {
    super()
    this.name = this.constructor.name
    this.message = message
    this.statusCode = statusCode || 500
  }
}

export class NotFoundError extends BaseError {
  constructor({ message }: { message?: string }) {
    super({
      message: message || 'Não foi possível encontrar este recurso no sistema.',
      statusCode: 404,
    })
  }
}

export class UnauthorizedError extends BaseError {
  constructor({ message }: { message?: string }) {
    super({
      message: message || 'Usuário não autenticado.',
      statusCode: 401,
    })
  }
}

export class ValidationError extends BaseError {
  constructor({ message }: { message?: string }) {
    super({
      message: message || 'Ocorreu um erro de validação.',
      statusCode: 400,
    })
  }
}

export class ForbiddenError extends BaseError {
  constructor({ message }: { message?: string }) {
    super({
      message: message || 'Você não possui permissão para executar esta ação.',
      statusCode: 403,
    })
  }
}

export class UnprocessableEntityError extends BaseError {
  constructor({ message }: { message?: string }) {
    super({
      message: message || 'Não foi possível realizar esta operação.',
      statusCode: 422,
    })
  }
}
