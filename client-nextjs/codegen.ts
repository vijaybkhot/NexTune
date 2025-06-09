import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: [
    // "src/app/**/*.tsx",
    // "src/components/**/*.tsx",
    // "src/lib/**/*.ts",
    // "src/queries/*.ts",
    // "src/graphql/**/*.graphql",
    "src/**/*.tsx",
    "src/**/*.graphql",
  ],
  generates: {
    "src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: { gqlTagName: "gql" },
    },
    "./src/__generated__/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
  // ignoreNoDocuments: true,
};

export default config;
