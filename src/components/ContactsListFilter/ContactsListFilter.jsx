import { ContactFormInput } from 'components';

export const ContactsListFilter = ({ fieldFilterValue, onChange }) => {
  return (
    <ContactFormInput
      label="Find contacts by name"
      type="text"
      name="filter"
      value={fieldFilterValue}
      onChange={onChange}
    />
  );
};
