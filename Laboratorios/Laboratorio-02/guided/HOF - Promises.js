/*
    *Arrays 
*/

const heroes = [
    {
      id: 1,
      name: "Thor",
    },
    {
      id: 2,
      name: "Iron Man",
    },
    {
      id: 3,
      name: "Batman",
    },
];

const origins = [
    {
      id: 1,
      location: "Asgard",
    },
    {
      id: 2,
      location: "Earth",
    },
];

/*
    *Funciones 
*/

const getHeroe = (id) => {
    return new Promise((resolve, reject) => {
        const heroe = heroes.find((h) => h.id === id)?.name;

        heroe ? resolve(heroe) : reject("Heroe not found");
    });
};

const getOrigin = (id) => {
    return new Promise((resolve, reject) => {
        const origin = origins.find((o) => o.id === id)?.location;

        origin ? resolve(origin) : reject("Origin not found");
    });
};

const id = 1;
let heroeName;

getHeroe(id).then((heroe) => {
    heroeName = heroe;
    return getOrigin(id).then((origin) => console.log(`${heroeName} is  from ${origin}`)).catch((err) => console.warn(err));
}).catch((err) => console.warn(err));