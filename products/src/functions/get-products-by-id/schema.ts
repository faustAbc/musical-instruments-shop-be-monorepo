import validator from '@middy/validator';
import { JSONSchemaType } from 'ajv';
import { Product } from 'shared/models/Product';
import { transpileSchema } from '@middy/validator/transpile';

interface PathParameters {
  productId: NonNullable<Product['id']>;
}

export const pathParameters = {
  type: 'object',
  properties: {
    productId: {
      type: 'string',
    },
  },
  required: ['productId'],
} satisfies JSONSchemaType<PathParameters>;

export default {
  eventSchema: transpileSchema({
    type: 'object',
    required: ['pathParameters'],
    properties: { pathParameters },
  }),
} satisfies Parameters<typeof validator>[0];
