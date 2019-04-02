const pool = require("../../databasePool");

// AccountTable class which records entries :)
class AccountTable {
  static storeAccount({ username, account }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account(username, password) VALUES($1, $2)`,
        [username, password],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

module.exports = AccountTable;
