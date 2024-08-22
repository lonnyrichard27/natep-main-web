import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  name: string;
  id: string;
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, name, id, options, value, onChange, className }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[16px] font-medium text-gray-900">
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded-lg border-gray-300 border px-3 py-3 text-gray-700 sm:text-sm"
      >
        <option value="">Please select</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
