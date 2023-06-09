import { useEffect, useState } from "react";
import "./App.css";
import FavoriteJokesContext from "../Context/FavoriteJokesContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Browse from "../Browse/Browse";
import JokeList from "../JokeList/JokeList";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const localJokes = JSON.parse(localStorage.getItem("jokes"));
    if (localJokes) setJokes(localJokes);
    const localFavoriteJokes = JSON.parse(localStorage.getItem("favoriteJokes"));
    if (localFavoriteJokes) favoriteJokesHook[1](localFavoriteJokes);
  }, []);

  const [loading, setLoading] = useState(false);

  const favoriteJokesHook = useState([]);

  return (
    <>
      <BrowserRouter>
        <FavoriteJokesContext.Provider value={favoriteJokesHook}>
          <header className="header">
            <h1>Jokester</h1>
            <nav>
              <Link to="/" className="link">
                🔎 Browse
              </Link>
              <Link to="/favorites" className="link">
                ❤️ Favorites
              </Link>
            </nav>
          </header>
          <main className="mainContainer">
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
                    <div className="sidebar">
                      <h1>Your favorite jokes:</h1>
                      <Link to="/" className="link returnMain">
                        🏠 Go back to main page
                      </Link>
                    </div>
                    <JokeList jokes={favoriteJokesHook[0]} />{" "}
                  </>
                }
              />
            </Routes>
          </main>
        </FavoriteJokesContext.Provider>
      </BrowserRouter>
    </>
  );

  function getJokes() {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/random_ten")
      .then((res) => res.json())
      .then((data) => {
        let result = data.filter(
          (joke) => jokes.find((j) => j.id === joke.id) === undefined
        );
        let tempJokes = [...jokes, ...result];
        setJokes(tempJokes);
        localStorage.setItem("jokes", JSON.stringify(tempJokes));
        setLoading(false);
      });
  }
}

export default App;
