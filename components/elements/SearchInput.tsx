import React, { ChangeEventHandler } from 'react';
import { CiSearch } from 'react-icons/ci';

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search',
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}) => {
  return (
    <div className='w-80'>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3.5'>
          <CiSearch className='text-md' />
        </div>
        <input
          type='text'
          className='block w-full rounded-md border border-gray-300 py-2 ps-10'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchInput;