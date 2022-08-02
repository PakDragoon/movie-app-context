import React, { useContext } from 'react'
import { AppContext } from '../context';

function Search() {
  const { dispatchUserEvent } = useContext(AppContext);
  const handleSearch = (e) => {
    e.preventDefault()
    const value = e.target.value
		dispatchUserEvent('SEARCH_FILTER', { newSearch: value });
  }

  return (
    <section className='layout-row justify-content-center mb-40'>
      <input 
        type='text'
        placeholder='Search for movie by name' 
        className='w-75 py-2'
        data-testid='search'
        onChange={handleSearch}
      />
    </section>
  )
}

export default Search
