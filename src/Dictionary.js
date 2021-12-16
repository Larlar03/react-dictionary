import axios from "axios";
import React, { useState } from "react";
import SearchResults from "./SearchResults";
import "./Dictionary.css";

export default function Search() {
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState(null);

  function updateKeyword(event) {
    setKeyword(event.target.value);
  }

  function search(event) {
    event.preventDefault();
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleResponse(response) {
    setResults(response.data[0]);
  }

  return (
    <div className="Dictionary">
      <form onSubmit={search}>
        <input
          type="search"
          onChange={updateKeyword}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <SearchResults results={results} />
    </div>
  );
}
