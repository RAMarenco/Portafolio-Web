const pokemon = [
    {
      name: "Pikachu",
      type: "electric",
      attackPoints: 55,
      defensePoints: 40,
    },
    {
      name: "Bulbasaur",
      type: "grass",
      attackPoints: 49,
      defensePoints: 49,
    },
    {
      name: "Charmander",
      type: "fire",
      attackPoints: 52,
      defensePoints: 43,
    },
    {
      name: "Squirtle",
      type: "water",
      attackPoints: 48,
      defensePoints: 65,
    },
];

const getPokemonType = (pType) => {
    return new Promise((resolve, reject) => {
        const type = pokemon.find((t) => t.type === pType)?.type;

        type ? resolve(type) : reject("Pokemon type not found");
    });
};

const getFTwoPokemon = () => {
    return new Promise((resolve, reject) => {
        const fTwoPokemon = pokemon.slice(0,2);

        fTwoPokemon ? resolve(fTwoPokemon) : reject("Pokemon not found");
    });
};

const addPokemon = (fPokemon, position) => {
    return new Promise((resolve, reject) => {
        const addPokemon = pokemon.splice(position,0,fPokemon);        
        addPokemon ? resolve() : reject("No pokemon added"); 
    });
};

const removePokemon = (position) => {
    return new Promise((resolve, reject) => {
        const pokemonArr1 = pokemon.slice(0,position);
        let pokemonNewArr = undefined;
        if(pokemonArr1.length !== pokemon.length){
            const pokemonArr2 = pokemon.slice(position + 1);
            pokemonNewArr = pokemonArr1.concat(pokemonArr2);
        }else{
            pokemonNewArr = pokemonArr1;
        }
        
        pokemonNewArr.length !== pokemon.length ? resolve(pokemonNewArr) : reject("The pokemon could not be removed"); 
    });
}

const teamInfo = (pokemonTeam) => {
    return new Promise((resolve, reject) => {
        const newTeam = pokemonTeam.map((k) => {
            return `The pokemon ${k.name} is a ${k.type} type with ${k.attackPoints} attack points and ${k.defensePoints} defense points`;
        });

        newTeam.length > 0 ? resolve(newTeam) : reject("The pokemon team is empty");
    });
}

const getTotalPoints = (pokemonTeam) => {
    return new Promise((resolve, reject) => {
        let attack = 0, defense = 0;
        for (let i = 0; i < pokemonTeam.length; i++) {
            attack += pokemonTeam[i].attackPoints;            
            defense += pokemonTeam[i].defensePoints;            
        }

        const bestStat = attack > defense ? `attack ${attack}` : defense > attack ? `defense ${defense}` : null;

        bestStat ? resolve(bestStat) : reject(`Attack and Defense have the same value: ${attack}`);
    });
}

let type = "fire";
let existsType;
let positionA = 2;
let positionR = 1;

let foundPokemon = 
{
    name: "Mewtwo",
    type: "psychic",
    attackPoints: 110,
    defensePoints: 90,
}

console.log(pokemon);

getPokemonType(type).then((type) => {
    existsType = type;
    console.log(`There is a pokemon with the type: ${existsType}`);

    return getFTwoPokemon().then((fTwoPokemon) => {
        console.log("\nThe first two pokemons in the team are:");
        console.log(fTwoPokemon);

        return addPokemon(foundPokemon, positionA).then(() => {
            console.log("\nPokemon added");

            return removePokemon(positionR).then((pokemonNewArr) => {
                console.log("\nPokemon removed");

                return teamInfo(pokemonNewArr).then((pokemonTeam) => {
                    console.log("\nThe pokemon team is:");
                    console.log(pokemonTeam);

                    return getTotalPoints(pokemonNewArr).then((bestStat) => {
                        console.log(`The best stat is: ${bestStat}`);
                    }).catch((err) => console.warn(err));
                }).catch((err) => console.warn(err));
            }).catch((err) => console.warn(err));
        }).catch((err) => console.warn(err));
    }).catch((err) => console.warn(err));
}).catch((err) => console.warn(err));

