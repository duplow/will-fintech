import { BadRequestException, UnauthorizedException } from '@nestjs/common'

const ENABLE_STACK_TRANCE = process.env.ENV === 'dev'

export const defaultErrorHandler = (ex: Error) => {
  if (ex instanceof BadRequestException) {
    return {
      status: 400,
      data: {
        message: 'Bad request',
      },
    }
  }

  if (ex instanceof UnauthorizedException) {
    return {
      status: 401,
      data: {
        message: 'User not authenticated or access denied',
      },
    }
  }

  return {
    status: 400,
    data: {
      message: 'Unexpected error',
      transient: true,
      ...(ENABLE_STACK_TRANCE
        ? {
            xRequestId: 'correlation-id',
            stack: ex.stack,
          }
        : {}),
    },
  }
}
