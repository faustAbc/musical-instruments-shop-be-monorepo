import { JSONSchemaType } from 'ajv';
import { Product } from 'shared/models/Product';
export interface GetProductsListDto {
  data: Product[];
}

export default {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        required: ['test'],
        type: 'object',
        properties: {
          test: {
            type: 'string',
          },
        },
      },
    },
  },
  required: ['data'],
} satisfies JSONSchemaType<GetProductsListDto>;
