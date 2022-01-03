const myName = 'Benji';

const myAge = 12;

const suma = (a: number, b: number) => a + b;

suma(10, 10);

// class Persona {
//   private age;
//   private name;

//   constructor(age: number, name: string) {
//       this.age = age;
//       this.name = name
//   }

//   getSumary() {
//     return `my name is ${this.name} & my age is ${this.age}`;
//   }
// }

class Persona {
  constructor(private age: number, private name : string) {}
  getSumary(){
    return `my name is ${this.name} & my age is ${this.age}`;
  }
}


const benji = new Persona(35, 'Benji');
benji.getSumary();
