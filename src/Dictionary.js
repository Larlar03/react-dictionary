import axios from "axios";
import React, { useState } from "react";
import SearchResults from "./SearchResults";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Search(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  //Sets the keyword variable as the user is typing into the form search input
  function updateKeyword(event) {
    setKeyword(event.target.value);
  }

  //Calls the sreach fucntion when the search form is submitted
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  //The api call function to search the keyword
  function search() {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleDictionaryResponse);

    let pexelsApiKey =
      "563492ad6f91700001000001ca8e5ebf1207403f80aedb69e2d0bba1";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=3`;
    let headers = { Authorization: `Bearer ${pexelsApiKey}` };
    axios
      .get(pexelsApiUrl, {
        headers: headers,
      })
      .then(handlePexelsResponse);
  }

  //When the correct api url is searched, saves the results we need to the results variable
  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
  }

  //Saves the pexels api resonse to variable when a word is searched
  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }

  //If the page hasn't loaded (search form not submitted yet)loaded sets loaded to true
  //and calls the search function with the default keyword prop that was defined in the App component
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
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
