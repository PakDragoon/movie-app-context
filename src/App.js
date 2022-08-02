import React, { useState } from "react"
import "./App.css"
import "h8k-components"
import { AppContext } from "./context"
import { Movieform, Movieslist, Search } from "./components"

const title = "Favorite Movie Directory"

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [size, setSize] = useState(true)

  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case "ADD_USER":
        setMovies([...movies, payload.newUser])
        return
      case "SIZE":
        setSize(payload.newSize)
        return
      case "SEARCH_FILTER":
        setSearch(payload.newSearch)
        return
      default:
        return
    }
  }

  return (
    <div>
      <h8k-navbar header={title} />
      <div className="layout-row justify-content-center mt-100">
        <AppContext.Provider value={{ movies, search, dispatchUserEvent }}>
          <div className="w-30 mr-75">
            <Movieform />
          </div>
          <div className="layout-column w-30">
            <Search />
            <Movieslist />
            {size === false ? (
              <div data-testid="noResult">
                <h3 className="text-center">No Results Found</h3>
              </div>
            ) : (
              ""
            )}
          </div>
        </AppContext.Provider>
      </div>
    </div>
  )
}

export default App
