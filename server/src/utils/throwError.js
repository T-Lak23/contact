import { AppError } from "./AppError.js";

export const throwError = (message, statusCode = 500) => {
  throw new AppError(message, statusCode);
};
