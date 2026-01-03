import { X } from "lucide-react";
import type { Contact } from "../hooks/useContact";
import { useEffect, useState } from "react";
import { inputValidator, type FormError } from "../utils/inputValidator";

interface Form {
  handleSubmit: (val: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: Contact;
  loading: boolean;
}

const ContactForm = ({
  handleSubmit,
  isOpen,
  onClose,
  onChange,
  formData,
  loading,
}: Form) => {
  const [errors, setErrors] = useState<FormError>({});

  useEffect(() => {
    const validationErrors = inputValidator(formData);
    setErrors(validationErrors);
  }, [formData]);

  if (!isOpen) return;

  const hasError = Object.values(errors).some(
    (e) => typeof e === "string" && e.length > 0
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
      <form
        onSubmit={(e) => onSubmit(e)}
        className=" relative bg-gray-100 sm:w-96 w-72 rounded-lg p-6"
      >
        <button
          type="button"
          className="absolute top-2.5 right-2"
          onClick={onClose}
        >
          <X />
        </button>
        <div className="flex flex-col justify-center mb-3  gap-1">
          <label htmlFor="name">Name</label>
          <input
            className={`p-3 rounded-lg border-2 ${
              errors.name ? "border-red-500" : "border-black"
            } focus:outline-none`}
            placeholder="John Doe"
            type="text"
            id="name"
            name="name"
            onChange={(e) => onChange(e)}
            value={formData.name}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col justify-center mb-3  gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="name"
            className={`p-3 rounded-lg border-2 ${
              errors.email ? "border-red-500" : "border-black"
            } focus:outline-none`}
            placeholder="johndoe@example.com"
            onChange={(e) => onChange(e)}
            value={formData.email}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col justify-center mb-3  gap-1">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className={`p-3 rounded-lg border-2 ${
              errors.phone ? "border-red-500" : "border-black"
            } focus:outline-none`}
            placeholder="7788995566"
            onChange={(e) => onChange(e)}
            value={formData.phone}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="flex flex-col justify-center mb-3  gap-1">
          <label htmlFor="message">Message</label>
          <textarea
            className={`resize-none p-3 rounded-lg border-2 ${
              errors.message ? "border-red-500" : "border-black"
            }
            focus:outline-none`}
            placeholder="Enter your message...."
            name="message"
            id="message"
            onChange={(e) => onChange(e)}
            value={formData.message}
          />
        </div>

        <button
          type="submit"
          className="px-3 py-2 rounded-lg text-white my-3 bg-black w-full disabled:cursor-not-allowed cursor-pointer"
          disabled={loading || hasError}
        >
          {loading ? "Creating..." : "Create Contact"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
