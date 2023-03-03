import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { data } from 'shared';

// import schema from './schema';

// const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () =>
//   formatJSONResponse(data.products);

const hello: ValidatedEventAPIGatewayProxyEvent<false> = async () =>
  formatJSONResponse(data.products);

export const main = middyfy(hello);
