import React, { useContext, useState } from "react"
import { AppContext } from "../context"

function Movieform() {
  const { dispatchUserEvent } = useContext(AppContext)
  const [movieName, setMovieName] = useState("")
  const [movieRating, setMovieRating] = useState(0)
  const [movieDuration, setMovieDuration] = useState("")
  const checkDuration = new RegExp(/^(?!0\d*$)\d+(?:\.\d{1})?(h|m)$/)
  const checkMinutes = new RegExp(/^(?!0\d*$)\d+(?:\.\d{1})?(m)$/)
  const checkHours = new RegExp(/^(?!0\d*$)\d+(?:\.\d{1})?(h)$/)

  const convertMinutesToHours = (movieDuration) => {
    if (checkMinutes.test(movieDuration)) {
      let durationInMinutes = parseFloat(movieDuration)
      let durationInHours = durationInMinutes / 60
      let roundedDuration = durationInHours.toFixed(1)
      movieDuration = roundedDuration.toString()
    } else if(checkHours.test(movieDuration)) {
      movieDuration = movieDuration.replace(/.$/, "")
    } else {
      movieDuration = ""
    }
    return movieDuration
  }

  const handleSubmitMovie = async (e) => {
    e.preventDefault()
    if (movieName.trim().length < 1 || !movieRating || movieDuration === "") {
      return
    }
    const convertedMovieDuration = convertMinutesToHours(movieDuration)
    if(convertedMovieDuration === "") return
    const data = { id: Math.random(), movieName, movieRating, movieDuration: convertedMovieDuration }
    dispatchUserEvent("ADD_USER", { newUser: data })
  }

  return (
    <section>
      <div className="card pa-30">
        <form onSubmit={handleSubmitMovie}>
          <div className="layout-column mb-15">
            <label htmlFor="name" className="mb-3">
              Movie Name
            </label>
            <input type="text" id="name" placeholder="Enter Movie Name" data-testid="nameInput" onChange={(e) => setMovieName(e.target.value)} />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="ratings" className="mb-3">
              Ratings
            </label>
            <input type="number" id="ratings" placeholder="Enter Rating on a scale of 1 to 100" data-testid="ratingsInput" onChange={(e) => setMovieRating(e.target.value)} />
          </div>
          <div className="layout-column mb-30">
            <label htmlFor="duration" className="mb-3">
              Duration
            </label>
            <input type="text" id="duration" placeholder="Enter duration in hours or minutes" data-testid="durationInput" onChange={(e) => setMovieDuration(e.target.value)} />
          </div>
          {/* Use this div when time format is invalid */}
          {checkDuration.test(movieDuration) === false && movieDuration !== "" ? (
            <div className="alert error mb-30" data-testid="alert">
              Please specify time in hours or minutes (e.g. 2.5h or 150m)
            </div>
          ) : (
            ""
          )}
          <div className="layout-row justify-content-end">
            <button type="submit" className="mx-0" data-testid="addButton">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Movieform
