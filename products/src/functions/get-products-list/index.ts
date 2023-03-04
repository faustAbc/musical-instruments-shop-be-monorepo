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
        documentation: {
          summary: 'Create User',
          description:
            'Creates a user and then sends a generated password email',
          tags: ['tag1'],
          externalDocumentation: {
            url: 'https://bing.com',
            description: 'A link to bing',
          },
          requestBody: {
            description: 'A user information object',
          },
          requestModels: {
            'application/json': 'PutDocumentRequest',
          },
          pathParams: [
            {
              name: 'username',
              description: 'The username for a user to create',
              schema: {
                type: 'string',
                pattern: '^[-a-z0-9_]+$',
              },
            },
          ],
          queryParams: [
            {
              name: 'membershipType',
              description: 'The user\'s Membership Type',
              schema: {
                type: 'string',
                enum: ['premium', 'standard'],
              },
            },
          ],
          cookieParams: [
            {
              name: 'SessionId',
              description: 'A Session ID variable',
              schema: {
                type: 'string',
              },
            },
          ],
          headerParams: {
            name: 'Content-Type',
            description: 'The content type',
            schema: {
              type: 'string',
            },
          },
          methodResponses: [
            {
              statusCode: 201,
              responseBody: {
                description: 'A user object along with generated API Keys',
              },
              responseModels: {
                'application/json': 'PutDocumentResponse',
              },
              responseHeaders: {
                'X-Rate-Limit-Limit': {
                  description:
                    'The number of allowed requests in the current period',
                  schema: {
                    type: 'integer',
                  },
                },
              },
            },
            {
              statusCode: 500,
              responseBody: {
                description: 'An error message when creating a new user',
              },
              responseModels: {
                'application/json': 'ErrorResponse',
              },
            },
          ],
        },
      } as any,
    },
  ],
};
