import { GraphQLScalarType, Kind } from "graphql";

const dateFormatRegex =
  /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(\d{4})$/;

function isValidDate(value) {
  if (!dateFormatRegex.test(value)) {
    return false;
  }

  const [month, day, year] = value.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function formatDate(dateString) {
  const [month, day, year] = dateString.split("/").map(Number);
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");
  return `${formattedMonth}/${formattedDay}/${year}`;
}

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "A date in MM/DD/YYYY, MM/D/YYYY, M/DD/YYYY, or M/D/YYYY format",
  serialize(value) {
    return formatDate(value);
  },
  parseValue(value) {
    if (typeof value !== "string" || !isValidDate(value)) {
      throw new Error(`Invalid date format: ${value}`);
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (!isValidDate(ast.value)) {
        throw new Error(`Invalid date format: ${ast.value}`);
      }
      return ast.value;
    }
    throw new Error("Date must be a string");
  },
});

export default DateScalar;
