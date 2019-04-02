const SHA256 = require("crypto-js/sha256");
const { APP_SECRET } = require("../../secrets");

const hash = string => {
  // Will return hash equivalent of the STRING :)

  // Specifically, SHA256() returns a more complex object with
  // some inner helper methods.
  return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
};

module.exports = { hash };
