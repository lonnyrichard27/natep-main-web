import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps {
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | any;
  className?: string;
  error?: FieldError | undefined | string;
  min?: string | number;
  max?: string | number;
}

const CustomInput: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  error,
  max,
  min,
  ...props
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className='block text-sm font-medium text-[#344054]'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='mt-1.5 w-full rounded-md border border-gray-200 px-3 py-3 outline-none focus-within:border-primary sm:text-sm'
        min={min}
        max={max}
        {...props}
      />
      {error && (
        <div className='text-xsm ml-1 mt-2 text-red-500'>
          {error.toString()}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
