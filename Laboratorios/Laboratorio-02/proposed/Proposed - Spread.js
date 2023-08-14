const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@test.com",
      age: 60,
      salary: 1099,
    },
    {
      id: 2,
      name: "Robert Singer",
      email: "bobby@test.com",
      age: 62,
      salary: 999,
    },
    {
      id: 3,
      name: "Misha Collins",
      email: "castiel@test.com",
      age: 35,
      salary: 899,
    },
    {
      id: 4,
      name: "Dean Winchester",
      email: "dean@test.com",
      age: 41,
      salary: 799,
    },
    {
      id: 5,
      name: "Sam Winchester",
      email: "sam@test.com",
      age: 36,
      salary: 699,
    },
];

console.log("-------- Users --------");
console.log(users);
console.log("-------- Users --------");

const updateUser = (idUser, newName, newSalary) => {
    return new Promise((resolve, reject) => {
        const usersCopy = [...users];
        const user = usersCopy.find((u) => u.id === idUser);
        user.name = newName;
        user.salary = newSalary;        

        user ? resolve(usersCopy) : reject("User not modified found");
    });
};

const usersWithOutId = (usersCopy) => {
    return new Promise((resolve, reject) => {
        const usersCopy2 = [...usersCopy];
        const usersWithOutId = usersCopy2.map(element => ({
            name: element.name,
            salary: element.salary,
            email: element.email,
            age: element.age,            
        }));

        usersWithOutId ? resolve(usersWithOutId) : reject("Array couldnt be processed");
    });    
}

updateUser(1, "John Winchester", 1500).then((usersCopy) => {
    console.log("-------- Modified users --------")
    console.log(usersCopy);
    console.log("-------- Modified users --------")

    usersWithOutId(usersCopy).then((usersWithOutId) => {
        console.log("-------- Users no Id --------")
        console.log(usersWithOutId);
        console.log("-------- Users no Id --------")
    }).catch((err) => console.warn(err));
}).catch((err) => console.warn(err));