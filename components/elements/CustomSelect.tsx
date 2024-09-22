import React from 'react';
import { FieldError } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  name: string;
  id?: string;
  options: Option[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  error?: FieldError | undefined | string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  id,
  options,
  value,
  onChange,
  className,
  error,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className='block text-sm font-medium text-gray-900'>
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className='mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-700 outline-none focus-within:border-primary sm:text-sm'
      >
        <option value=''>Please select</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <div className='text-xsm ml-1 mt-2 text-red-500'>
          {error.toString()}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
