import { useState } from 'react';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';
import { ContactFormInput, ContactFormButton } from 'components';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  const [contact, setContact] = useState(INITIAL_STATE);

  const onChange = ({ target }) =>
    setContact(prev => ({ ...prev, [target.name]: target.value }));

  const onFormSubmit = event => {
    event.preventDefault();

    const id = nanoid();
    const { name, number } = contact;

    reset();
    onSubmit({ id, name, number });
  };

  const reset = () => {
    setContact(INITIAL_STATE);
  };

  return (
    <form className={css.form} name="contactForm" onSubmit={onFormSubmit}>
      <ContactFormInput
        label="Name"
        type="text"
        name="name"
        value={contact.name}
        required={true}
        focus={true}
        onChange={onChange}
      />
      <ContactFormInput
        label="Number"
        type="tel"
        name="number"
        value={contact.number}
        required={true}
        onChange={onChange}
      />
      <ContactFormButton text="Add contact" type="submit" />
    </form>
  );
};
