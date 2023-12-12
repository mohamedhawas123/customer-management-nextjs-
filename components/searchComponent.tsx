import React, { useState, ChangeEvent } from 'react';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='search' >
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleInputChange}
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
    />
    </div>
    
  );
};

export default SearchInput;
