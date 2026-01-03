import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { useContact } from "../hooks/useContact";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  const {
    contacts,
    sort,
    handleFormChange,
    sortChangeHandler,
    fetchLoading,
    formLoading,
    submitHandler,
    formData,
    fetchContacts,
    deleteLoading,
    deleteOneContact,
  } = useContact();

  const [isOpen, setIsOpen] = useState(false);

  const SORT_OPTIONS = [
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
    { label: "Name (A–Z)", value: "name asc" },
    { label: "Name (Z–A)", value: "name desc" },
  ];

  useEffect(() => {
    fetchContacts();
  }, [sort]);

  return (
    <>
      <div className="w-full min-h-screen p-4">
        <div className="flex items-center justify-between flex-row-reverse">
          <div className="flex items-center gap-1 mt-5 mb-7">
            <p className=" text-base font-medium">Sort</p>
            <select
              className="border border-black rounded-lg text-base"
              value={sort}
              onChange={(e) => sortChangeHandler(e.target.value)}
            >
              {SORT_OPTIONS?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              className="bg-black px-3 py-2 rounded-lg text-white"
              onClick={() => setIsOpen(true)}
            >
              Create Contact
            </button>
          </div>
        </div>
        <h1 className="md:text-2xl text-lg font-semibold mb-2">Contact List</h1>
        <div>
          {fetchLoading ? (
            <Loader />
          ) : !contacts.length ? (
            <p>No contacts found, create one</p>
          ) : (
            <ul className="grid xl:grid-cols-4 gap-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {contacts?.map((contact) => (
                <div
                  key={contact._id}
                  className="bg-black px-4 py-3 rounded-lg text-white"
                >
                  <li className="font-semibold text-lg">{contact.name}</li>
                  <li className="text-[12px]">{contact.email}</li>
                  <li className="text-[12px]">{contact.phone}</li>
                  <li className="text-[12px]">{contact.message}</li>
                  <button
                    onClick={() => deleteOneContact(contact._id!)}
                    className="bg-red-500 rounded-lg w-full px-3 py-2 font-semibold my-3 disabled:cursor-not-allowed"
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? "Deleting" : "Delete"}
                  </button>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ContactForm
        handleSubmit={submitHandler}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onChange={handleFormChange}
        formData={formData}
        loading={formLoading}
      />
    </>
  );
};

export default Contact;
