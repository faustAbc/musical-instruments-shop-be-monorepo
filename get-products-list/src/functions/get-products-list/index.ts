import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';
import type { AWS } from '@serverless/typescript';

const getProductsListFunction: Required<AWS>['functions'][string] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export default getProductsListFunction;
