import { promises as fsPromises } from 'fs';
import path from 'path';

const __dirname = path.resolve();

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function readContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

async function writeContacts(contacts) {
  try {
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    throw error;
  }
}

export async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

export async function getContactById(contactId) {
  const contacts = await readContacts();
  return contacts.find(contact => contact.id === contactId) || null;
}

export async function removeContact(contactId) {
  const contacts = await readContacts();
  const contactToRemove = contacts.find(contact => contact.id === contactId);

  if (!contactToRemove) return null;

  const updatedContacts = contacts.filter(contact => contact.id !== contactId);
  await writeContacts(updatedContacts);

  return contactToRemove;
}

export async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: Date.now().toString(), name, email, phone };
  const updatedContacts = [...contacts, newContact];
  await writeContacts(updatedContacts);

  return newContact;
}
