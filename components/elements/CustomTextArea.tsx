import React from 'react';
import { FieldError } from 'react-hook-form';

interface CustomTextAreaProps {
  label: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
  error?: FieldError | undefined | string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  id,
  placeholder = 'Say hi...',
  rows = 3,
  value,
  onChange,
  className = '',
  disabled = false,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-[#344054]'>
        {label}
      </label>
      <textarea
        id={id}
        className={`mt-1.5 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 ${className}`}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      {error && (
        <div className='text-xsm ml-1 mt-2 text-red-500'>
          {error.toString()}
        </div>
      )}
    </div>
  );
};

export default CustomTextArea;
