import errorToDto from '@libs/middlewares/errorToDto';
import middy, { MiddlewareObj } from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';

export const middyfy = (
  handler: (...args: any[]) => any,
  options?: { validationSchema: Parameters<typeof validator>[0] },
) => {
  const middyHandler = middy(handler).use(middyJsonBodyParser());

  if (options?.validationSchema) {
    middyHandler.use(validator(options.validationSchema));
  }

  middyHandler.use(httpErrorHandler()).use(errorToDto() as MiddlewareObj);

  return middyHandler;
};
