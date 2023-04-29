import { useState } from "react";
import "./App.css";
import FavoriteJokesContext from "../Context/FavoriteJokesContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Browse from "../Browse/Browse";
import JokeList from "../JokeList/JokeList";

function App() {
  const [jokes, setJokes] = useState([]);

  const [loading, setLoading] = useState(false);

  const favoriteJokesHook = useState([]);

  return (
    <>
      <BrowserRouter>
        <FavoriteJokesContext.Provider value={favoriteJokesHook}>
          <div className="mainContainer">
            <Routes>
              <Route
                path="/"
                element={
                  <Browse
                    jokes={jokes}
                    getJokes={getJokes}
                    loading={loading}
                    favoriteJokes={favoriteJokesHook[0]}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <>
                    <Link to="/"> Go back</Link>
                    <JokeList jokes={favoriteJokesHook[0]} />{" "}
                  </>
                }
              />
            </Routes>
          </div>
        </FavoriteJokesContext.Provider>
      </BrowserRouter>
    </>
  );

  function getJokes() {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/random_ten")
      .then((res) => res.json())
      .then((data) => {
        setJokes([...jokes, ...data]);
        setLoading(false);
      });
  }
}

export default App;
