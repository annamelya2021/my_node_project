import Contact from '../../models/contactModel.js';
import RequestError from '../../helpers/errors/requestError.js';

const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const createContact = async (req, res) => {
  const { name, link } = req.body;
  const newContact = new Contact({ name, link });
  const contact = await newContact.save();
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const response = await Contact.findByIdAndDelete(id);
  if (!response) {
    throw RequestError(404, 'Contact not found');
  }
  res.status(200).json({ message: 'Contact deleted successfully' });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, link } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(id, { name, link }, { new: true });
  if (!updatedContact) {
    throw RequestError(404, 'Contact not found');
  }
  res.status(200).json(updatedContact);
};

export default {
  getContacts,
  createContact,
  deleteContact,
  updateContact
};
