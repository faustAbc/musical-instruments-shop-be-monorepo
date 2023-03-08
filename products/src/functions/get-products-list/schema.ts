import validator from '@middy/validator';
import { JSONSchemaType } from 'ajv';
import { transpileSchema } from '@middy/validator/transpile';
import { GetProductsListDto } from '@alexgusevserg/shared';

const responseSchema = {
  type: 'array',
  items: {
    required: ['description', 'price', 'title'],
    type: 'object',
    properties: {
      id: {
        type: 'string',
        nullable: true,
      },
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      price: {
        type: 'number',
      },
    },
  },
} satisfies JSONSchemaType<GetProductsListDto>;

export default {
  responseSchema: transpileSchema(responseSchema),
} satisfies Parameters<typeof validator>[0];
