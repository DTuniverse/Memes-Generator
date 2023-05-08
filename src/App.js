import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState(5);
  const [topText, setTopText] = useState(null);
  const [bottomText, setBottomText] = useState(null);
  const fetchMemes = async () => {
    try {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setMemes(data.data.memes);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMemes();
  }, []);

  const prevMeme = () => {
    setCurrentMeme((prev) => {
      if (prev === 0) {
        return memes.length - 1;
      }
      return (prev = prev - 1);
    });
  };

  const nextMeme = () => {
    setCurrentMeme((prev) => {
      if (prev === memes.length) {
        return 0;
      }
      return (prev = prev + 1);
    });
  };

  const updateTopText = (value) => {
    setTopText(value);
    console.log(topText);
  };

  const updateBottomText = (value) => {
    setBottomText(value);
    console.log(bottomText);
  };

  return (
    <div className="App">
      <h1>Memes Generator</h1>
      <button onClick={() => prevMeme()}>Prev meme</button>
      <button onClick={nextMeme}>Next meme</button>
      <br />
      <input
        onChange={(e) => updateTopText(e.target.value)}
        placeholder="top text"
      ></input>
      <br />
      <input
        onChange={(e) => updateBottomText(e.target.value)}
        placeholder="bottom text"
      ></input>
      <div className="container">
        <img src={memes[currentMeme]?.url} alt={memes[currentMeme]?.name} />
        <h3 id="top-text">{topText}</h3>
        <h3 id="bottom-text">{bottomText}</h3>
      </div>
    </div>
  );
}

export default App;
