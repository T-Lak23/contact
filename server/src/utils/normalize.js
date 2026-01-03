import { throwError } from "./throwError.js";

export const normalize = (field, value) => {
  const trimmedValue = value?.trim();

  if (field !== "message" && !trimmedValue) {
    throwError(`${field} cannot be empty`, 400);
  }

  switch (field) {
    case "message":
      return trimmedValue || "";

    case "name":
      return trimmedValue
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    case "email": {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(trimmedValue);

      if (!isValid) {
        throwError("Email is not valid", 400);
      }

      return trimmedValue.toLowerCase();
    }

    default:
      return trimmedValue;
  }
};
