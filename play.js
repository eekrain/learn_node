// const nama = "Max";
// let age = 20;
// let hasHobbies = true;

// // function summarizeUser(userName, userAge, userHasHobby) {
// //   return `Name is ${userName} age is ${userAge} and user has hobby ${userHasHobby}`;
// // }

// const summarizeUser = (userName, userAge, userHasHobby) => {
//   return `Name is ${userName} age is ${userAge} and user has hobby ${userHasHobby}`;
// };

// const addRandom = () => 1 + 3;
// console.log("🚀 ~ file: play.js ~ line 14 ~ addRandom", addRandom());

// console.log(summarizeUser(nama, age, hasHobbies));

const person = {
  nama: "Eka",
  age: 23,
  //   function inside an object
  greet() {
    console.log("hi im " + this.nama);
  },
};
console.log("🚀 ~ file: play.js ~ line 22 ~ person", person);

person.greet();

const num = [1, 2, 3, 4, 5];

// for (let x of num) {
//   console.log(x);
// }

console.log(
  num.map((x) => {
    return x + 2;
  })
);

// SPREAD OPERATOR

// copy array dengan method slice
// const copiedArrayOfNum = num.slice();
// copy array dgn spread operator
const copiedArrayOfNum = [...num];

const toArray = (...args) => {
  return args;
};
console.log(
  "🚀 ~ file: play.js ~ line 49 ~ toArray ~ toArray",
  toArray(7, 8, 9, 0)
);

// DESTRUCTURING

const printName = ({ nama }) => {
  console.log(nama);
};
printName(person);

const { nama, age } = person;
console.log("🚀 ~ file: play.js ~ line 65 ~ age", age);
console.log("🚀 ~ file: play.js ~ line 64 ~ nama", nama);

const [num1, num2] = num;
console.log("🚀 ~ file: play.js ~ line 69 ~ num2", num2);
console.log("🚀 ~ file: play.js ~ line 69 ~ num1", num1);
