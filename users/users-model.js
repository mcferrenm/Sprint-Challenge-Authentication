const db = require("../database/dbConfig");

module.exports = {
  add: function(user) {
    return db("users").insert(user);
  },
  get: function(id) {
    const query = db("users");

    if (id) {
      return query.where({ id }).first();
    }

    return query;
  },
  findBy(filter) {
    return db("users")
      .where(filter)
      .first();
  }
};
