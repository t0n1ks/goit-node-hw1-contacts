import { Command } from 'commander';
import { listContacts, getContactById, removeContact, addContact } from './contacts.js';

const program = new Command();

program
  .option('-a, --action <type>', 'Виберіть дію')
  .option('-i, --id <type>', 'ID контакта')
  .option('-n, --name <type>', "Ім'я контакта")
  .option('-e, --email <type>', 'Email контакта')
  .option('-p, --phone <type>', 'Номер телефону контакта');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
        .then(contacts => {
          console.log('Список контактів:');
          console.table(contacts);
        })
        .catch(error => {
          console.error('Помилка отримання списку контактів:', error);
        });
      break;

      case 'get':
        getContactById(id)
          .then(contact => {
            if (contact) {
              console.log('Знайдений контакт:');
              console.log(contact);
            } else {
              console.log('null');
            }
          })
          .catch(error => {
            console.error('Помилка отримання контакту за ID:', error);
          });
        break;

    case 'add':
      addContact(name, email, phone)
        .then(addedContact => {
          console.log('Доданий новий контакт:');
          console.log(addedContact);
        })
        .catch(error => {
          console.error('Помилка додавання нового контакту:', error);
        });
      break;

      case 'remove':
        removeContact(id)
          .then(removedContact => {
            if (removedContact) {
              console.log('Видалений контакт:');
              console.log(removedContact);
            } else {
              console.log('null');
            }
          })
          .catch(error => {
            console.error('Помилка видалення контакту за ID:', error);
          });
        break;
  
      default:
        console.warn('\x1B[31m Невідомий тип дії!');
    }
}

invokeAction(argv);
