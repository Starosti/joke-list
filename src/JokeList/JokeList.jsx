import Joke from "../Joke/Joke";
import "./JokeList.css";

import { useEffect, useState } from "react";

function JokeList({ jokes }) {
  const [searchParam, setSearchParam] = useState("");

  const [categories, setCategories] = useState(["all"]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [filteredJokes, setFilteredJokes] = useState(jokes);

  useEffect(() => {
    const tempCategories = ["all"];
    jokes.forEach((joke) => {
      if (!tempCategories.includes(joke.type)) {
        tempCategories.push(joke.type);
      }
    });
    setCategories(tempCategories);
  }, [jokes]);

  useEffect(() => {
    setFilteredJokes(
      jokes.filter((joke) => {
        return (
          (searchParam === "" ||
            joke.setup.toLowerCase().includes(searchParam.toLowerCase()) ||
            joke.punchline.toLowerCase().includes(searchParam.toLowerCase())) &&
          (selectedCategory === "all" || joke.type === selectedCategory)
        );
      })
    );
  }, [searchParam, jokes, selectedCategory]);

  return (
    <div className="jokeList">
      <div className="topBar">
        <h1>Total Jokes: {jokes.length}</h1>
        {filteredJokes.length !== jokes.length && (
          <h1 className="filteredJokes">
            Jokes with selected filters: {filteredJokes.length}
          </h1>
        )}
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onInput={(e) => {
            setSearchParam(e.target.value);
          }}
        />
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          onChange={(e) => setSelectedCategory(e.target.value.toLowerCase())}
        >
          {categories.map((category) => (
            <option key={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
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
