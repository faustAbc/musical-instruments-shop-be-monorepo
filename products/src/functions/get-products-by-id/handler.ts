import validationSchema, { pathParameters } from './schema';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { data } from 'shared';
import httpErrors from 'http-errors';
import { FromSchema } from 'json-schema-to-ts';

export const handler:  ValidatedEventAPIGatewayProxyEvent<false> = async (event) => {
  const path = event.pathParameters as FromSchema<typeof pathParameters>;
  const { productId } = path;

  if (typeof productId !== 'string') {
    throw new httpErrors.UnprocessableEntity('Product Id should be string');
  }

  const targetProduct = data.products.find(
    (product) => product.id === productId,
  );

  if (typeof targetProduct === 'undefined') {
    throw new httpErrors.NotFound(`Product with Id ${productId} was not found`);
  }

  return formatJSONResponse(targetProduct);
};

export const main = middyfy(handler, { validationSchema });
