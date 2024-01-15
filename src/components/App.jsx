import { useEffect, useState } from 'react';
import {
  ContactForm,
  Section,
  ContactsListFilter,
  ContactsList,
} from 'components';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    let contacts = [];
    try {
      contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    } catch (error) {
      console.log(error);
    }

    return contacts;
  });

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.log(error);
    }
  }, [contacts]);

  const onChange = ({ target }) => {
    setFilter(target.value);
  };

  const onDelete = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const addContact = newContact => {
    if (isContactAlreadyAdded(newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts(prev => [...prev, newContact]);
  };

  const isContactAlreadyAdded = name => {
    return (
      contacts.filter(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      ).length > 0
    );
  };

  const searchResult = () => {
    const keyword = filter?.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(keyword)
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>

      {contacts.length > 0 && (
        <Section title="Contacts">
          <ContactsListFilter onChange={onChange} />
          <ContactsList contacts={searchResult()} onDelete={onDelete} />
        </Section>
      )}
    </>
  );
};
