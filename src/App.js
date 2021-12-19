import "./App.css";
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="Container"></div>
      <header className="app-header">
        <h1>Dictionary</h1>
      </header>
      <main>
        <Dictionary defaultKeyword="dusk" />
      </main>
      <footer>Coded by Lana Gordon</footer>
    </div>
  );
}

export default App;
