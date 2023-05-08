import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [memes, setMemes] = useState([]);

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
  console.log(memes);
  return (
    <div className="App">
      <h1>Memes Generator</h1>
      <img src={memes[0]?.url} alt={memes[0]?.name} />
    </div>
  );
}

export default App;
