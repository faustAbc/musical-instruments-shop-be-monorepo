import { formatJSONResponse } from '@libs/api-gateway';
import { MiddlewareObj } from '@middy/core';
import { HttpError } from 'http-errors';

const errorToDto = (): MiddlewareObj<any, any, HttpError> => ({
  onError: (request) => {
    if (request.error) {
      request.response ??= {};

      const body = {
        error: {
          ...request.response.error,
          message: request.error.message,
          statusCode: request.error.statusCode,
          name: request.error.name,
        },
      };

      request.response = formatJSONResponse(body, {
        statusCode: request.error.statusCode,
      });

      return request.response;
    }
  },
});

export default errorToDto;
