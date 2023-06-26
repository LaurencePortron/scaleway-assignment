import React from 'react';

interface IInputProps {
  placeholder: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder, onInputChange }: IInputProps) {
  return (
    <input
      placeholder={placeholder}
      onChange={onInputChange}
      className='bg-white border-b border-1 border-b-primaryButton p-1 w-full border-transparent focus-visible:border-b-primaryButton text-black rounded
      focus:outline-none focus-visible:ring-1 focus-visible:ring-transparent focus-visible:ring-opacity-50'
    ></input>
  );
}

export { Input };
