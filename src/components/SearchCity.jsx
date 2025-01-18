import React from 'react'
import { Search } from "lucide-react";

const SearchCity = ({search, setSearch, handleSearch}) => {

  return (
    <div className='flex justify-evenly items-center'>
      <input
      type='text'
      className='rounded-lg outline-none p-6 w-[80%] max-sm:p-3.5'
      placeholder='Search for a city...'
      name='search'
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={handleSearch}><Search color="#fff" size={40}/></button>
    </div>
  )
}

export default SearchCity
