import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchMeaning = async () => {
    if (!word) return;

    try {
      setError("");
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const result = await response.json();

      if (response.ok) {
        setData(result[0]);
      } else {
        setError("Word not found 😢");
        setData(null);
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="app">
      <h1>📘 Dictionary App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button onClick={fetchMeaning}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="result">
          <h2>{data.word}</h2>

          {data.meanings.map((meaning, index) => (
            <div key={index} className="meaning">
              <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
              <p>
                <strong>Meaning:</strong>{" "}
                {meaning.definitions[0].definition}
              </p>
              {meaning.definitions[0].example && (
                <p>
                  <strong>Example:</strong>{" "}
                  {meaning.definitions[0].example}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

