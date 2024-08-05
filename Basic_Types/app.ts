// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "Kim",
//   age: 30,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, "author"],
// };

enum Role {
  ADMIN = 5,
  READ_ONLY = 100,
  AUTHOR,
}

const person = {
  name: "Kim",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

let favoriteActivities: any[];
favoriteActivities = ["Sports", 1];

console.log(person.name);

person.hobbies.forEach((val) => {
  console.log(val);
});

// person.role.push("test");

if (person.role === Role.ADMIN) {
  console.log("is ADMIN");
}
