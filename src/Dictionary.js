import axios from "axios";
import React, { useState } from "react";
import SearchResults from "./SearchResults";
import "./Dictionary.css";

export default function Search(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);

  function updateKeyword(event) {
    setKeyword(event.target.value);
  }

  function search() {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleResponse(response) {
    setResults(response.data[0]);
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h1>What word do you want to define?</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="suggested words: movie, blossom, nightfall"
              onChange={updateKeyword}
              className="form-control"
            />
          </form>
        </section>

        <SearchResults results={results} />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
