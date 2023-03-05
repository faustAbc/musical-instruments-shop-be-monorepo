import { DeepPartial } from '@alexgusevserg/shared';
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import deepmerge from 'deepmerge';
import type { FromSchema, JSONSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S extends JSONSchema> = Omit<
  APIGatewayProxyEvent,
  'body'
> & {
  body: FromSchema<S>;
};

export type ValidatedEventAPIGatewayProxyEvent<S extends JSONSchema> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export interface LambdaResponse {
  statusCode: number;
  body: string;
  isBase64Encoded: boolean;
  headers: {
    'content-type': 'application/json';
  } & Record<string, string>;
}

export const formatJSONResponse = (
  response: Record<string, unknown> | Record<string, unknown>[],
  propsToOverride: Partial<Omit<LambdaResponse, 'body'>> = {},
): LambdaResponse =>
  deepmerge(
    {
      statusCode: 200,
      body: JSON.stringify(response),
      isBase64Encoded: false,
      headers: {
        'content-type': 'application/json',
      },
    },
    propsToOverride,
  );


export type MakeParametersOptional<Fn> = Fn extends (
  ...args: infer FnArgs
) => any
  ? (...args: DeepPartial<FnArgs>) => any
  : never;