import type { AWS } from '@serverless/typescript';
import merge from 'deepmerge';

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

const defaultServerlessConfiguration = {
  provider: {
    profile: 'trials',
  },
} satisfies DeepPartial<AWS>;

export const withDefaultServerlessConfiguration = (config: AWS) =>
  merge(defaultServerlessConfiguration, config) as AWS;
