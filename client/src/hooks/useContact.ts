import { useState } from "react";
import { API } from "../utils/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";

export interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
  _id?: string;
}

export const useContact = () => {
  const [formData, setFormData] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchParms, setSearchParams] = useSearchParams();

  const sort = searchParms.get("sort") || "latest";

  //   ----------------------------------------------------------------

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const response = await API.post("/create-contact", formData);
      //   setContacts((prev) => ({ ...prev, ...response.data.contactForm }));
      clearFormData();
      await fetchContacts();
      toast.success(response.data?.message || "Contact created successfully!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Failed to create form");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setFormLoading(false);
    }
  };

  //   ----------------------------------------------------------------

  const fetchContacts = async () => {
    setFetchLoading(true);
    try {
      const response = await API.get("/contacts", {
        params: { sort },
      });
      setContacts(response.data?.contacts);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Failed to create form");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setFetchLoading(false);
    }
  };

  //   ----------------------------------------------------------------

  const deleteOneContact = async (id: string) => {
    setDeleteLoading(true);
    try {
      const repsonse = await API.delete(`/contact/${id}`);
      await fetchContacts();
      toast.success(repsonse.data?.message || "Deleted");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Failed to create form");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  //   ----------------------------------------------------------------

  const sortChangeHandler = (value: string) => {
    setSearchParams({ sort: value });
  };

  //   ----------------------------------------------------------------

  const clearFormData = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  //   ----------------------------------------------------------------

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    submitHandler,
    formData,
    contacts,
    handleFormChange,
    fetchContacts,
    sortChangeHandler,
    fetchLoading,
    formLoading,
    sort,
    deleteOneContact,
    deleteLoading,
  };
};
