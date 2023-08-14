//Declaracion de variable logica
let pokemons = [];
let type = {
    normal: "#c7c2b9",
    fighting: "#82341d",
    ghost: "#5c5cad",
    bug: "#88960e",
    dark: "#4b382b",
    dragon: "#755edf",
    electric: "#e69202",
    fairy: "#e496e4",
    fire: "#c72100",
    flying: "#98a9f4",
    grass: "#68bc2d",
    ground: "#ad954b",
    ice: "#9fe8ff",
    poison: "#8e408f",
    psychic: "#dc3165",
    rock: "#bea65c",
    steel: "#b0b0be",
    water: "#3698fb",
};

//Declaracion de variables visuales

let pokeForm = null;
let pokeParty = null;
let pokemons_indexes = null;

// bind views
const bindElements = () => {
    pokeForm = document.querySelector("#pokemon-form");
    pokeParty = document.querySelector("#pokemon-party-section");
}

const setFormListener = () => {
    pokeForm.addEventListener("submit", (e) => {
        e.preventDefault();        
        const data = new FormData(pokeForm);        
        pokemons_indexes = document.querySelectorAll('[data-index]');
        
        try{
            pokemons_indexes.forEach((element) => {
                if (element.dataset.index === data.get('index')) {                    
                    throw BreakException
                }
            });
        } catch (e) {
            alert("Este numero de pokemon ya existe en el registro");
            return;
        }

        /* const _pokemon = {
            index: data.get("index"),
            name: data.get("name"),
            sprite: data.get("sprite"),
            height: data.get("height"),
            weight: data.get("weight"),
            type_1: data.get("type-1"),
            type_2: data.get("type-2"),
            hp: data.get("hp"),
            atk: data.get("atk"),
            def: data.get("def"),
            spa: data.get("spa"),
            spd: data.get("spd")
        } */

        const _pokemon = {};
        let hasErrors = false;
        data.forEach((value, key) => {
            if(!value) {
                hasErrors = true;
            }

            _pokemon[key] = value;
            if(key === "type-1"){
                _pokemon.color = type[value];
            }            
        })

        if(hasErrors) {
            alert("Se encontraron errores");
            return;
        }

        //pokemons = [...pokemons, _pokemon];

        pokemons.unshift(_pokemon);        
        renderPokemons();
        pokeForm.reset();        
    });
}

const createPokemonCard = (poke) => {
    return `    
        <figure>
            <img src="${poke.sprite}" alt="Pokemon Sprite">
        </figure>

        <div class="info">
            <h4> ${poke.name} </h4>
            <p> # ${poke.index} </p>
            <p> Altura: ${poke.height} </p>
            <p> Peso: ${poke.weight} </p>
        </div>
        
        <div class="stats">
            <div class="stat">
                <p> HP: </p>
                <div class="bar">
                <div style="width:${(poke.hp/255)*100}%"></div>
                </div>
            </div>
            
            <div class="stat">
                <p> ATK: </p>
                <div class="bar">
                    <div style="width:${(poke.atk/255)*100}%"></div>
                </div>
            </div>

            <div class="stat">
                <p> DEF: </p>
                <div class="bar">
                <div style="width:${(poke.def/255)*100}%"></div>
                </div>
            </div>

            <div class="stat">
                <p> SPA: </p>
                <div class="bar">
                    <div style="width:${(poke.spa/255)*100}%"></div>
                </div>
            </div>

            <div class="stat">
                <p>SPD: </p>
                <div class="bar">
                    <div style="width:${(poke.spd/255)*100}%"></div>
                </div>
            </div>        
        </div>
    `;
}

const createButton = (index) => {
    let button = document.createElement('button');
    button.addEventListener('click', (e) => {
        for ( var i = 0; i < pokemons.length; i++) {
            if (pokemons[i].index === index) {
                pokemons.splice(i, 1);                
            }
        }        
        document.querySelector(`[data-index="${index}"]`).remove();        
    });

    button.innerHTML = '<i class="fa-solid fa-trash"></i>';    

    return button;
}

const createArticle = (p) => {
    let article = document.createElement('article');
    article.dataset.index = p.index;
    article.style.backgroundColor = p.color;    

    article.innerHTML = createPokemonCard(p);
    article.appendChild(createButton(p.index));

    return article;
}

const renderPokemons = () => {
    pokeParty.innerHTML = "<h3>Pokemon Party</h3>";
    pokemons.sort((a,b) => {
        if (a.index > b.index) {
            return 1;
        }
        if (a.index < b.index) {
            return -1;
        }
    });
    pokemons.forEach((p) => {        
        pokeParty.appendChild(createArticle(p));
    });
}

// Main function

const Main = () => {
    bindElements();
    setFormListener();    
}

window.onload = Main;