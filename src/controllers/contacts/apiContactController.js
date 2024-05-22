
import Contact from './models/contactModel.js';
// import createPath from '../helpers/create-path.js';



const getContacts = (req, res) => {
  const title = 'Contacts';
  Contact
    .find()
    .then(contacts => res.render(('contacts'), { contacts, title }))
    .catch((error) => {
      console.log(error);
      res.render(('error'), { title: 'Error' });
    });
}

const createContact = (req, res) => {
  const { name, link } = req.body;
  const contact = new Contact({ name, link });
  contact
    .save()
    .then(() => res.redirect(('contacts'), { contacts, title }))
    .catch((error) => {
      console.log(error);
      res.render(('error'), { title: 'Error' });
    }); 
}
const deleteContacts = (req, res) => {
  Contact
    .deleteMany()
    .then(() => res.redirect(('contacts'), { contacts, title }))
    .catch((error) => {
      console.log(error);
      res.render(('error'), { title: 'Error' });
    });}

const updateContact = (req, res) => {
  const { id } = req.params;
  const { name, link } = req.body;
  Contact
    .findByIdAndUpdate(id, { name, link })
    .then(() => res.redirect(createPath('contacts'), { contacts, title }))
    .catch((error) => {
      console.log(error);
      res.render(('error'), { title: 'Error' });
    });
}

module.exports = {
  getContacts,
  createContact,
  deleteContacts,
  updateContact
};
