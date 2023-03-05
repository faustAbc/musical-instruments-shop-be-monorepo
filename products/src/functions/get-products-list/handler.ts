import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { data } from 'shared';

const handler: ValidatedEventAPIGatewayProxyEvent<false> = async () =>
  formatJSONResponse(data.products);

export const main = middyfy(handler);
