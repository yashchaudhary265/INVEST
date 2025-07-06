import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#0f172a',
    borderColor: '#6366f1',
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#0f172a',
    zIndex: 20,
  }),
  option: (provided, state) => ({
    ...provided,
    color: '#999',
    fontWeight: state.isSelected ? 'bold' : 'normal',
    backgroundColor: state.isSelected ? '#6366f1' : 'transparent',
    textShadow: '3 3 3px rgb(254, 254, 254)',
    cursor: 'pointer',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
};

const CompanySelector = ({ options, onChange }) => {
  const handleChange = (selected) => {
    // Allow up to 50 selections
    const selectedValues = selected ? selected.map((item) => item.value).slice(0, 50) : [];
    onChange(selectedValues);
  };

  return (
    <Select
      options={options.map((company) => ({ value: company, label: company }))}
      isMulti
      closeMenuOnSelect={false}
      onChange={handleChange}
      placeholder="Select up to 50 companies..."
      styles={customStyles}
    />
  );
};

export default CompanySelector;
