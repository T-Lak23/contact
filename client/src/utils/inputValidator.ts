import type { Contact } from "../hooks/useContact";
export type FormError = Partial<Record<keyof Contact, string>>;
export const inputValidator = (data: Contact) => {
  const errors: FormError = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Email is invalid!";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone is required";
  }
  return errors;
};
