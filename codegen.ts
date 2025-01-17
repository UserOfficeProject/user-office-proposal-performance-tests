import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `${process.env.GRAPHQL_URL ||'http://localhost:4000/graphql'}`,
  documents: [
    'src/graphql/**/*.ts',
    'src/graphql/**/*.graphql',
    'src/graphql/**/*.gql'
  ],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
  },
};

export default config;