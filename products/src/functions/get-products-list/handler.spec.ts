const sampleProduct = {
  description: 'Short Product Description1',
  id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
  price: 24,
  title: 'ProductOne',
};

vitest.doMock('shared', () => ({ data: { products: [sampleProduct] } }));

import { DeepPartial } from '@alexgusevserg/shared';
import { main } from './handler';

type MakeParametersOptional<Fn> = Fn extends (...args: infer FnArgs) => any
  ? (...args: DeepPartial<FnArgs>) => any
  : never;

const typedHandler = main as MakeParametersOptional<typeof main>;

describe('get-products-list', () => {
  it('Responds with data', async () => {
    const result = await typedHandler({
      headers: {},
    });

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify([sampleProduct]),
      isBase64Encoded: false,
      headers: { 'content-type': 'application/json' },
    });
  });
});
