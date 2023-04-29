import Joke from "../Joke/Joke";
import "./JokeList.css";

import { useEffect, useState } from "react";

function JokeList({ jokes }) {
  const [searchParam, setSearchParam] = useState("");

  const [filteredJokes, setFilteredJokes] = useState([]);

  useEffect(() => {
    setFilteredJokes(
      jokes.filter((joke) => {
        if (searchParam === "") return true;
        return (
          joke.setup.toLowerCase().includes(searchParam.toLowerCase()) ||
          joke.punchline.toLowerCase().includes(searchParam.toLowerCase())
        );
      })
    );
  }, [searchParam, jokes]);

  return (
    <div className="jokeList">
      <div className="topBar">
        <h1>Total Jokes: {jokes.length}</h1>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onInput={(e) => {
            setSearchParam(e.target.value);
          }}
        />
      </div>
      <ul>
        {jokes.length === 0 && <h1 className="noJokes">No jokes yet!</h1>}
        {jokes.length !== 0 &&
          filteredJokes.length === 0 &&
          searchParam !== "" && (
            <h1 className="noJokes">No jokes found for that search!</h1>
          )}
        {filteredJokes.map((joke) => (
          <li key={joke.id}>
            <Joke joke={joke} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JokeList;
