const { program } = require("commander");

const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if (!contact) {
        console.log(`Can not find contact with id ${id}`);
      } else {
        console.log(`We found contact with id ${id}`);
      }
      console.table(contact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      if (newContact) {
        console.log(`Contact with name ${name} was added`);
      }
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      if (deleteContact) {
        console.log(`Contact was deleted successfully`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();
invokeAction(options);
