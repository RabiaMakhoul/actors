import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'api/projects.graphql',
  generates: {
    "./src/generated/graphql.ts": {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
