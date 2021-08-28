import './App.css';
import Axios from "axios";
import React, {useState} from "react";
import RecipeTile from './RecipeTile';

function App() {
  const [query, setquery] = useState("")
  const [recipes, setrecipes] = useState([])
  const [healthLabel, sethealthLabel] = useState("vegan")
  const YOUR_APP_ID = "7d4bf52d";
  const YOUR_APP_KEY = "eab923f1a73921f70ef450c533dccb71";
  var url= `https://api.edamam.com/search?q=${query}&
  app_id=${YOUR_APP_ID}&
  app_key=${YOUR_APP_KEY}&health=alcohol-free`;

  async function getRecipies(){
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    getRecipies();
  }
  return (
    <div className="app">
      <h1>Food Recipies Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
      <input 
      type="text" 
      className = "app__input"
      placeholder="Enter Input" 
      value={query} 
      onChange={(e) => setquery(e.target.value)} />
      <input type="submit" className="app__submit" value="Search" />
      <select className="app_healthLabels">
        <option onClick={() => sethealthLabel("vegan")}>Vegan</option>
      </select>
      </form>
      <div className="app__recipes">
      {recipes.map((recipe) => {
        return <RecipeTile recipe={recipe} />;
      })}
      </div>
    </div>
  );
}
export default App;
