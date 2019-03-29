// const TRAITS = [
//   {
//     "type": "backgroundColor",
//     "values": ["black", "white", "green", "blue"]
//   },
//   {
//     "type": "pattern",
//     "values": ["plain", "striped", "spotted", "patchy"]
//   },
//   {
//     "type": "build",
//     "values": ["slender", "stocky", "sporty", "skinny"]
//   },
//   {
//     "type": "size",
//     "values": ["small", "medium", "large", "enormous"]
//   }
// ];

// get randomTraits() {
//   const traits = [];

//   TRAITS.forEach(TRAIT => {
//     // Each single "type" value :)
//     const traitType = TRAIT.type;
//     // Array of 4 values :)
//     const traitValues = TRAIT.values;

//     //Find random value in "values" array :)
//     const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];

//     // For each trait type (4 types :) ), one trait and one
//     // corresponding random value out of the "values" array
//     // in that specific type instance is pushed to the
//     // "traits" array.
//     traits.push({ traitType, traitValue });
//   });

//   return traits;
// }

new Promise((resolve, reject) => {
  setTimeout(() => resolve("Hello"));
  // "message =>" equals whatever is RETURNED in the
  // code receding .then
})
  .then(message => {
    console.log(message); // Hello
    return new Promise((resolve, reject) =>
      setTimeout(resolve(message + " World"))
    );
    // "message =>" equals whatever is RETURNED in the
    // code receding .then. In this case, a new Promise
    // is explicitly returned with the string
    // "Hello World", thus....
  })
  .then(message => {
    // Hello World is console logged!
    console.log(message); // Hello World
    return new Promise((resolve, reject) =>
      setTimeout(resolve(message + "!!!"))
    );
    // "message" is the value of whatever is returned
    // in the code preceding .then
    // In this case, it is "Hello World!!!"
  })
  .then(message => {
    console.log(messsage); // Hello World!!!
  });

// setTimeout() is an asynchronous function that
// doesn't block the call stack.
