import type { AWS } from '@serverless/typescript';
import { withDefaultServerlessConfiguration } from '@alexgusevserg/shared';
import * as functions from '@functions/index';

const serverlessConfiguration = {
  service: 'products',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-s3-sync'],
  params: {
    default: {
      FEStackNameParameter: 'my-store-app-dev',
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    profile: 'trials',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions,
  package: { individually: true },
  custom: {
    siteName: 'products-openapi-docs',
    s3Sync: [
      {
        bucketName: '${self:custom.siteName}',
        localDir: 'docs-dist',
      },
    ],
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    extensions: {
      HttpApi: {
        Properties: {
          CorsConfiguration: {
            AllowCredentials: false,
            AllowHeaders: ['*'],
            AllowMethods: ['*'],
            /** Only deployed documentation and and FE are allowed */
            AllowOrigins: [
              { 'Fn::GetAtt': ['StaticSite', 'WebsiteURL'] },
              {
                'Fn::Join': [
                  '',
                  [
                    'https://',
                    {
                      'Fn::ImportValue': {
                        'Fn::Sub':
                          '${param:FEStackNameParameter}::WebAppCloudFrontDistribution::DomainName',
                      },
                    },
                  ],
                ],
              },
            ],
            ExposeHeaders: ['Date'],
            MaxAge: 3600,
          },
        },
      },
    },
    Resources: {
      /** Bucket for documentation */
      StaticSite: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          AccessControl: 'PublicRead',
          BucketName: '${self:custom.siteName}',
          WebsiteConfiguration: {
            IndexDocument: 'index.html',
          },
        },
      },
      StaticSiteS3BucketPolicy: {
        Type: 'AWS::S3::BucketPolicy',
        Properties: {
          Bucket: {
            Ref: 'StaticSite',
          },
          PolicyDocument: {
            Statement: [
              {
                Sid: 'PublicReadGetObject',
                Effect: 'Allow',
                Principal: '*',
                Action: ['s3:GetObject'],
                Resource: {
                  'Fn::Join': [
                    '',
                    [
                      'arn:aws:s3:::',
                      {
                        Ref: 'StaticSite',
                      },
                      '/*',
                    ],
                  ],
                },
              },
            ],
          },
        },
      },
    },
  },
} satisfies AWS;

module.exports = withDefaultServerlessConfiguration(serverlessConfiguration);
