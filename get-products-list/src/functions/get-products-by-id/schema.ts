import { JSONSchemaType } from 'ajv';
import { GetProductsListDto } from 'shared/models/Product';

export default {
  type: 'array',
  items: {
    required: ['description', 'price', 'title'],
    type: 'object',
    properties: {
      id: {
        type: ['string', 'null'],
        /**
         * AWS Gateway supports OpenAPI only partially.
         * Correct OpenAPI specification for `id` field should be
         * `{type: 'string', nullable: true}`
         * But valid type for AWS Gateway is current implementation
         * See Github issues:
         * https://github.com/stoplightio/spectral/issues/403
         * https://github.com/serverless/serverless/issues/8442
         * */
      } as any,
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
