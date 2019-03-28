const Dragon = require("./dragon");

// Creating an instance called "fooey"
// of the "Dragon" class.
const fooey = new Dragon({
  birthdate: new Date(),
  nickname: "fooey"
});
const baloo = new Dragon({
  birthdate: new Date(),
  nickname: "baloo",
  traits: [{ traitType: "backgroundColor", traitValue: "blue" }]
});

const mimar = new Dragon();

setTimeout(() => {
  const gooby = new Dragon();
  console.log(gooby);
}, 3000);

console.log(fooey);
console.log(baloo);
console.log(mimar);
