import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
if (!endpoint) {
  throw new Error("NEXT_PUBLIC_GRAPHQL_ENDPOINT is not set in codegen.ts");
}

const config: CodegenConfig = {
  overwrite: true,
  schema: endpoint,
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
