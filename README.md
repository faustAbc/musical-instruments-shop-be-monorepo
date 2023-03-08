# Serverless Backend

This project contains Serverless functions as backend, and documentation for them

## Installation

> **Requirements**: NodeJS `v18`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

- Run `yarn` in project root `./` to install the project dependencies
- Run `yarn` in folder `./products` to install the **products** package dependencies

### Development

- Run `yarn build:watch` to start watch build

### Deployment

- Run `yarn build:deploy` to deploy functions to AWS Cloud

### Documentation

- Update OpenAPI documentation in `./docs/openapi.yml`
- Run `yarn docs:build` to build documentation to static assets
- Run `yarn docs:deploy` to deploy documentation to AWS Cloud

## Tech stack

## Products NPM Scripts

| Name                 | Description                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deploy`             | Deploy functions and documentation to AWS                                                                                                             |
| `build:deploy`       | Build and deploy functions and documentation                                                                                                          |
| `build:watch`        | Watch for changing files and recompile changed files. Used for development                                                                            |
| `deps:upgrade-local` | Reinstall latest version of packages defined in monorepo. Use this when locally-defined packages change and publish to NPM, or use `npm link` instead |
| `docs:dev`           | Dynamic hot recompilation and serving of documentation                                                                                                |
| `docs:build`         | Build documentation to static assets                                                                                                                  |
| `docs:preview`       | Run documentation build locally                                                                                                                       |
| `test:watch`         | Run dynamic compilation for test                                                                                                                      |
| `test:coverage`      | Run coverage                                                                                                                                          |

## Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for lambda functions
- `libs` - containing shared code base between lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── functionName
│   │   │   ├── handler.ts      # `functionName` lambda source code
│   │   │   ├── index.ts        # `functionName` lambda Serverless configuration
│   │   │   └── schema.ts       # `functionName` lambda input event JSON-Schema
│   │   │   └── handler.spec.ts # `functionName` lambda tests
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│   │
│   └── test                    # Tests configuration
│       └── vite.config.ts      # Vite config file for tests 
│   │
│   └── docs                    # Documentation source code and configuration
│       └── vite.config.ts      # Vite config file for documentation 
│       └── openapi.yml         # File for Open API(Swagger) documentation
│       └── src                 # Source code for documentation entry
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths

```

## 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
