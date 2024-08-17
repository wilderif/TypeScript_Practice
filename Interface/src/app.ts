interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name + " " + this.age);
  }
}

let user1: Greetable;

user1 = new Person("Max", 30);
// user1.name = "Manu"; // Error: Cannot assign to 'name' because it is a read-only property.

user1.greet("Hi there - I am");
console.log(user1);
