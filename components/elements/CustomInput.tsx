import React from 'react';

interface InputProps {
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CustomInput: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
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
        className='mt-1.5 w-full rounded-md border border-gray-200 px-3 py-3 sm:text-sm'
      />
    </div>
  );
};

export default CustomInput;
