import JokeList from "../JokeList/JokeList";
import "./Browse.css";
import { Link } from "react-router-dom";

function Browse({ jokes, getJokes, loading, favoriteJokes }) {
  return (
    <>
      <div className="sidebar">
        <h1>Click below to get some fresh jokes!</h1>
        <button className="addJokesBtn" onClick={getJokes}>
          Add 10 Random Jokes
        </button>
        {loading && <h1>Adding more jokes...</h1>}
        <Link to="/favorites" className="link">
          See Your Favorite Jokes
        </Link>
        {"Favorite Jokes: " + favoriteJokes.length}
      </div>
      <div className="mainJokeList">
        <JokeList jokes={jokes} />
      </div>
    </>
  );
}

export default Browse;
