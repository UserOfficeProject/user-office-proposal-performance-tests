import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `${process.env.GRAPHQL_URL ||'http://localhost:4000/graphql'}`,
  documents: [
    'src/graphql/gql/*.ts',
    'src/graphql/gql/*.graphql',
    'src/graphql/gql/*.gql'
  ],
  overwrite:true,
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
     
      config: {
        plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
        documentMode: 'string',
      },
    },
  },
};

export default config;