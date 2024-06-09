import React, { useState, useEffect } from "react";
import { getContact, deleteContact } from "../../utils/fetch";
import { getToken } from "../../utils/local";
import { useNavigate } from "react-router-dom";
import "./Contacts.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const result = await getContact();
      if (result && Array.isArray(result)) {
        setContacts(result);
      }
    };

    const checkAdminStatus = () => {
      const token = getToken();
      if (token) {
        try {
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          //console.log("Token Payload:", tokenPayload);
          if (tokenPayload.user && tokenPayload.user.roles === "admin") {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    };

    fetchContacts();
    checkAdminStatus();
  }, []);

  const handleDelete = async (contactId) => {
    const result = await deleteContact(contactId);
    if (result.success) {
      setContacts(contacts.filter(contact => contact._id !== contactId));
    }
  };

  const handleEdit = (contactId) => {
    navigate(`/contacts/edit/${contactId}`);
  };

  return (
    <div className="contacts-container">
      <h2>Contacts</h2>
      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contact._id} className="contact-item">
            <a href={contact.link}>{contact.name}</a>
            {isAdmin && (
              <div className="contact-actions">
                <button className="edit-button" onClick={() => handleEdit(contact._id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(contact._id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
