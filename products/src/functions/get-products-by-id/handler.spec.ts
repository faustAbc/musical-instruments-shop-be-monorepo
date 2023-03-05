const sampleProduct = {
  description: 'Short Product Description1',
  id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
  price: 24,
  title: 'ProductOne',
};

vitest.doMock('shared', () => ({ data: { products: [sampleProduct] } }));

import { MakeParametersOptional } from '@libs/api-gateway';
import { main } from './handler';


const typedHandler = main as MakeParametersOptional<typeof main>;

describe('get-products-by-id', () => {
  it('Responds with data', async () => {
    const result = await typedHandler({
      pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa' },
      headers: {},
    });

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(sampleProduct),
      isBase64Encoded: false,
      headers: { 'content-type': 'application/json' },
    });
  });

  it('Responds with 404 error if product is not found', async () => {
    const result = await typedHandler({
      pathParameters: { productId: '__incorrect-product-id__' },
      headers: {},
    });

    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        error: {
          message: 'Product with Id __incorrect-product-id__ was not found',
          statusCode: 404,
          name: 'NotFoundError',
        },
      }),
      isBase64Encoded: false,
      headers: { 'content-type': 'application/json' },
    });
  });

  it('Responds with 400 error if product id missing', async () => {
    const request = await typedHandler({
      pathParameters: { productId: undefined },
      headers: {},
    });

    expect(request).toEqual({
      statusCode: 400,
      body: '{"error":{"message":"Event object failed validation","statusCode":400,"name":"BadRequestError"}}',
      isBase64Encoded: false,
      headers: { 'content-type': 'application/json' },
    });
  });
});
