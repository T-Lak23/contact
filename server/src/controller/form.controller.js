import { Form } from "../model/form.model.js";
import { normalize } from "../utils/normalize.js";
import { throwError } from "../utils/throwError.js";

export const createContatForm = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    const normalizedName = normalize("name", name);
    const normalizedEmail = normalize("email", email);
    const normalizedPhone = normalize("phone", phone);
    const normalizedMessage = normalize("message", message);

    const contactForm = new Form({
      name: normalizedName,
      email: normalizedEmail,
      phone: normalizedPhone,
      message: normalizedMessage,
    });

    await contactForm.save();

    res.status(201).json({
      message: "Contact successfully created",
      contactForm,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactData = async (req, res, next) => {
  const query = req.query.sort.toLowerCase();
  try {
    let sortQuery = {};

    if (query) {
      switch (query) {
        case "oldest":
          sortQuery = { createdAt: 1 };
          break;
        case "latest":
          sortQuery = { createdAt: -1 };
          break;
        case "name asc":
          sortQuery = { name: 1 };
          break;
        case "name desc":
          sortQuery = { name: -1 };
          break;
        default:
          sortQuery = { createdAt: -1 };
      }
    }

    const contacts = await Form.find({}).sort(sortQuery);

    if (!contacts.length) {
      return res.status(200).json({
        message: "No contacts to show, create one",
      });
    }

    res.status(200).json({
      message: "List of all contacts",
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await Form.findByIdAndDelete(id);
    if (!deletedContact) {
      return throwError("Contact does not exist", 404);
    }

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
