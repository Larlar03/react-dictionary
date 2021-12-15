import React, { useState } from "react";
import "./Dictionary.css";

export default function Search() {
  let [keyword, setKeyword] = useState("");

  function updateKeyword(event) {
    setKeyword(event.target.value);
  }

  function search(event) {
    event.preventDefault();
    alert(`Searching for ${keyword}`);
  }

  return (
    <div className="Dictionary">
      <form onSubmit={search}>
        <input type="search" onChange={updateKeyword} />
      </form>
    </div>
  );
}
