import { useContext, useEffect, useState } from "react";
import "./Joke.css";
import FavoriteJokesContext from "../Context/FavoriteJokesContext";

const Joke = ({ joke }) => {
  const [punchlineVisible, setPunchlineVisible] = useState(false);
  const [favoriteJokes, setFavoriteJokes] = useContext(FavoriteJokesContext);

  function removeFavoriteJoke(joke) {
    const newFavoriteJokes = favoriteJokes.filter(
      (favoriteJoke) => favoriteJoke.id !== joke.id
    );
    setFavoriteJokes(newFavoriteJokes);
    localStorage.setItem("favoriteJokes", JSON.stringify(newFavoriteJokes));
  }

  function addFavoriteJoke(joke) {
    const newFavoriteJokes = [...favoriteJokes, joke];
    setFavoriteJokes(newFavoriteJokes);
    localStorage.setItem("favoriteJokes", JSON.stringify(newFavoriteJokes));
  }

  return (
    <div className="jokeContainer">
      <div className="jokeSetup">
        {joke.setup} {favoriteJokes.includes(joke) && "❤️"}
      </div>
      <div
        className={"jokePunchline " + (punchlineVisible ? "visible" : "hidden")}
      >
        {joke.punchline} <br /> <br /> {joke.type && <span className="jokeCategory">🏷️ {joke.type.charAt(0).toUpperCase() + joke.type.slice(1)}</span>}
      </div>
      <button
        className="jokePunchlineBtn"
        onClick={() => {
          setPunchlineVisible(!punchlineVisible);
        }}
      >
        {punchlineVisible ? "🔒 Hide Punchline" : "👀 Show Punchline"}
      </button>
      <button
        className={
          "jokeFavoriteBtn " + (punchlineVisible ? "visible" : "hidden")
        }
        onClick={() => {
          favoriteJokes.includes(joke)
            ? removeFavoriteJoke(joke)
            : addFavoriteJoke(joke);
        }}
      >
        {favoriteJokes.includes(joke)
          ? "❌ Remove from favorites"
          : "❤️ Favorite"}
      </button>
    </div>
  );
};

export default Joke;
