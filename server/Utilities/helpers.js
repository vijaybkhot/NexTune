export function normalizeCountryName(country) {
  return country
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// export function isValidCountry(country) {
//   return !!getCode(country.trim());
// }

export function isValidDate(value) {
  const dateFormatRegex =
    /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(\d{4})$/;
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

export function validateDate(dateFormed) {
  if (!isValidDate(dateFormed)) {
    return false;
  }

  const [month, day, year] = dateFormed.split("/").map(Number);
  const dateObj = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dateObj > today) {
    return false;
  }

  return true;
}

export function isValidDuration(value) {
  if (typeof value !== "string" || value.trim() === "") return false;
  if (!/^\d{1,2}:\d{2}$/.test(value)) return false;

  let [mins, secs] = value.split(":").map(Number);

  if (!Number.isInteger(mins) || !Number.isInteger(secs)) return false;
  if (mins < 0 || secs < 0 || secs > 59 || (mins == 0 && secs == 0))
    return false;

  return true;
}
