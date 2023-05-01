import { useContext, useEffect, useState } from "react";
import "./Joke.css";
import FavoriteJokesContext from "../Context/FavoriteJokesContext";

const Joke = ({ joke }) => {
  const [punchlineVisible, setPunchlineVisible] = useState(false);
  const [favoriteJokes, setFavoriteJokes] = useContext(FavoriteJokesContext);

  return (
    <div className="jokeContainer">
      <div className="jokeSetup">
        {joke.setup} {favoriteJokes.includes(joke) && "❤️"}
      </div>
      <div
        className={"jokePunchline " + (punchlineVisible ? "visible" : "hidden")}
      >
        {joke.punchline}
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
            ? setFavoriteJokes(
                favoriteJokes.filter((favoriteJoke) => favoriteJoke !== joke)
              )
            : setFavoriteJokes([...favoriteJokes, joke]);
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
