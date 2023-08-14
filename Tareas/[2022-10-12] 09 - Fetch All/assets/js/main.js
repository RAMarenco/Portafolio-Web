//Declaracion de variables logica
let pokemons = [];

//Declaracion de variables visuales
let pokeForm = null;
let pokeParty = null;

//bind views
const bindElements = () => {
  pokeForm = document.querySelector("#pokemon-form");
  pokeParty = document.querySelector("#pokemon-party-section");
}

// fetch pokemon info

const fetchAllPokemon = async () => {
  let firstGenPokemon = [];
  try {
    
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", { mode: "cors" });
    if(response.ok) {
      firstGenPokemon.pop();
      //Deserializar el contenido de la petición
      const _data = await response.json();
      for(const pokemon of _data.results){
        await new Promise(done => setTimeout(() => done(), 10));
        let pokemonElement = {};
        pokemonElement = await fetchPokemonInfo(pokemon.url);
        firstGenPokemon = [pokemonElement,...firstGenPokemon];
      }       
    }    
    
  } catch (error) {
    console.error(error);
    console.error("Ups! Ocurrió un error en la conexión")
  } finally {
    return firstGenPokemon;
  }
}

const fetchPokemonInfo = async (url) => {
  let data = null;

  try {
    
    const response = await fetch(url, { mode: "cors" });
    if(response.ok) {
      //Deserializar el contenido de la petición
      const _data = await response.json();
      data = castResponseToPokemon(_data);
    }

  } catch (error) {
    console.error(error);
    console.error("Ups! Ocurrió un error en la conexión")
  } finally {
    return data;
  }  
};

// cast pokemon info
const getColorFromType = (type) => {
  const _color = {
    "normal": "#c7c2b9",
    "fighting": "#82341d",
    "ghost": "#5c5cad",
    "bug": "#88960e",
    "dark": "#4b382b",
    "dragon": "#755edf",
    "electric": "#e69202",
    "fairy": "#e496e4",
    "fire": "#c72100",
    "flying": "#98a9f4",
    "grass": "#68bc2d",
    "ground": "#ad954b",
    "ice": "#9fe8ff",
    "poison": "#8e408f",
    "psychic": "#dc3165",
    "rock": "#bea65c",
    "steel": "#b0b0be",
    "water": "#3698fb",
  }

  return _color[type] || "";
};

const normalizeStatName = (stat) => {
  const _names = {
    "hp": "hp",
    "attack": "atk",
    "defense": "def",
    "special-attack": "s-atk",
    "special-defense": "s-def",
    "speed": "spd"
  }

  return _names[stat] || "";
};

const castResponseToPokemon = (data) => {
  return {
    index: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    height: data.height,
    weight: data.weight,        
    types: data.types.map(type => type.type.name),
    stats: data.stats.reduce((result, stat) => {
      return {
        ...result,
        [normalizeStatName(stat.stat.name)]: stat.base_stat
      }    
    }, {})
  }
};

// Pokemon Services

const savePokemon = (pokemonToSave) => {
  pokemons = [pokemonToSave, ...pokemons];
}

const removePokemon = (index) => {
  pokemons = pokemons.filter(pkmn => pkmn.index !== index);
}

const createPokemonCard = (poke) => {  
  const stats = Object.keys(poke.stats).map(statKey => {
    return `
      <div class="stat">
        <p> ${statKey.toUpperCase()}: </p>
        <div class="bar">
          <div style="width: ${(poke.stats[statKey]/255)*100}%;"></div>
        </div>
      </div>
    `;
  });  
  
  const content = `
  <figure>
    <img src=${poke.sprite} alt="Pokemon Sprite">
  </figure>

  <div class="info">
    <h4> ${poke.name} </h4>
    <p> # ${String(poke.index).padStart(3, "0")} </p>
    <p> Altura: ${poke.height} </p>
    <p> Peso: ${poke.weight} </p>
  </div>

  <div class="stats">
    ${stats.join('\n')}
  </div>
  <button class="delete-pokemon-btn"><i class="fa-solid fa-trash"></i></button>
  `;

  const _article = document.createElement("article");
  _article.innerHTML = content;
  _article.dataset.index = poke.index;
  _article.style.backgroundColor = getColorFromType(poke.types[0])

  _article.querySelector(".delete-pokemon-btn")
    .addEventListener("click", ()=> {
      removePokemon(poke.index);
      renderPokemons();
    });
    
  return _article;
}

document.addEventListener("DOMContentLoaded", async () => {  
  let _pokemons = {};
  _pokemons = await fetchAllPokemon();
  _pokemons.forEach(poke => {
    savePokemon(poke);
  });
  
  renderPokemons();
});

const renderPokemons = () => {
  pokeParty.innerHTML = "<h3>Kanto Pokedex</h3>";
  pokemons.forEach(poke => {
    pokeParty.appendChild(createPokemonCard(poke));    
  });
  
}

//Main function
const Main = () => {
  bindElements();  
}

window.onload = Main;