import { GraphQLError } from "graphql";

function invalidInputError(message) {
  return new GraphQLError(message, {
    extensions: { code: "INVALID_INPUT" },
  });
}

function internalServerError(message) {
  return new GraphQLError(message, {
    extensions: { code: "INTERNAL_SERVER_ERROR" },
  });
}

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}

function handleGraphQLError(error, message) {
  console.error(message, error);

  if (error instanceof GraphQLError) {
    throw error;
  }

  throw internalServerError(message);
}
export {
  invalidInputError,
  internalServerError,
  notFoundError,
  handleGraphQLError,
};
