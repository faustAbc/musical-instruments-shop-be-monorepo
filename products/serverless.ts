import type { AWS } from '@serverless/typescript';
import { withDefaultServerlessConfiguration } from 'shared';
import * as functions from '@functions/index';

const serverlessConfiguration = {
  service: 'products',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-openapi-documenter'],
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
} satisfies AWS;

module.exports = withDefaultServerlessConfiguration(serverlessConfiguration);
