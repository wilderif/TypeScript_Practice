// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
  // (a: number, b: number, c: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputNmae?: string;
}

interface Greetable extends Named {
  greet(phrase?: string): void;
}

class Person implements Greetable {
  name?: string;
  outputNmae?: string;
  age?: number;

  constructor(name?: string, age?: number) {
    if (name) {
      this.name = name;
    }
    if (age) {
      this.age = age;
    }
  }

  greet(phrase?: string) {
    if (this.name && phrase) {
      console.log(phrase + " " + this.name + " " + this.age);
    } else {
      console.log("Hi!");
    }
  }
}

let user1: Greetable;

user1 = new Person("Max", 30);
// user1.name = "Manu"; // Error: Cannot assign to 'name' because it is a read-only property.

user1.greet("Hi there - I am");
console.log(user1);

let user2: Greetable = new Person();
user2.greet();
console.log(user2);
