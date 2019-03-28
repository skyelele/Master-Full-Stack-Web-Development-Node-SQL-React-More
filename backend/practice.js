const TRAITS = [
  {
    "type": "backgroundColor",
    "values": ["black", "white", "green", "blue"]
  },
  {
    "type": "pattern",
    "values": ["plain", "striped", "spotted", "patchy"]
  },
  {
    "type": "build",
    "values": ["slender", "stocky", "sporty", "skinny"]
  },
  {
    "type": "size",
    "values": ["small", "medium", "large", "enormous"]
  }
];

get randomTraits() {
  const traits = [];

  TRAITS.forEach(TRAIT => {
    // Each single "type" value :)
    const traitType = TRAIT.type;
    // Array of 4 values :)
    const traitValues = TRAIT.values;

    //Find random value in "values" array :)
    const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];

    // For each trait type (4 types :) ), one trait and one
    // corresponding random value out of the "values" array
    // in that specific type instance is pushed to the
    // "traits" array.
    traits.push({ traitType, traitValue });
  });

  return traits;
}