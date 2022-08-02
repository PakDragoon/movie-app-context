import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context';

function Movieslist() {
  const { movies, search } = useContext(AppContext);
  const { dispatchUserEvent } = useContext(AppContext)
  const [filteredList, setFilteredList] = useState(movies);

  useEffect(() => {
    const filter = () => {
      if(search.length > 1) {
        const filteredMovies = movies.filter((row) => {
          return row.movieName.toLowerCase().startsWith(search.toLowerCase())
        })
        dispatchUserEvent("SIZE", {newSize: filteredMovies > 0})
        filteredMovies.sort((a,b) => b.movieDuration - a.movieDuration);
        setFilteredList(filteredMovies)
      } else {
        movies.sort((a,b) => b.movieDuration - a.movieDuration);
        dispatchUserEvent("SIZE", {newSize: true})
        setFilteredList(movies)
      }
    }
    filter()
  }, [search, movies])

  return (
    <section>
      {movies.length > 0 ? <ul 
        className='styled w-100 pl-0' 
        data-testid='moviesList'
      >
      {filteredList.map((row, index) => {
        return (
          <li 
            key={row.id}
            className='flex slide-up-fade-in justify-content-between'
            style={{borderBottom: '2px solid var(--primary-color)'}}
          >
            <div className='layout-column w-40'>
              {/* use this header for movie name */}
              <h3 className='my-3'>{row.movieName}</h3>
              {/* use this paragraph for movie ratings, for example: 'Ratings: 88/100' */}
              <p className='my-0'>Ratings: {row.movieRating}/100</p>
            </div>
            <div className='layout-row my-auto mr-20'>
              {/* use this paragraph for movie duration, for example: '2.5 Hrs' */}
              <p className='justify-content-end'>{row.movieDuration} Hrs</p>
            </div>
          </li>
        )
      })}
      </ul> : ""}
    </section>
  )
}

export default Movieslist;
