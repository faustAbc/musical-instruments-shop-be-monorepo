import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { data } from 'shared';
// import validationSchema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<false> = async (event) => { 
  console.log({ event });
  

  return  formatJSONResponse(data.products);
};

export const main = middyfy(handler);
