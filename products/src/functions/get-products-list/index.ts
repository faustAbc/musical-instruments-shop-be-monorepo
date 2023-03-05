import { handlerPath } from '@libs/handler-resolver';
import type { AWS } from '@serverless/typescript';
// import { OperationObject } from 'openapi3-ts';

export const getProductsList: Required<AWS>['functions'][string] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products',
      },
    },
  ],
};
