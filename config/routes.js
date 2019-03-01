const axios = require("axios");
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");
const { authenticate } = require("../auth/authenticate");
const tokenService = require("../auth/token-service");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
  server.get("/api/users", getUsers);
  server.get("/api/users/:id", getUsersById);
};

async function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ error: "Must provide username and password to register" });
  } else {
    try {
      const hash = bcrypt.hashSync(password, 10);
      req.body.password = hash;

      const [id] = await Users.add(req.body);

      const user = await Users.get(id);
      if (user) {
        const token = tokenService.generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}, here is your token`,
          token,
          username: user.username
        });
      } else {
        res.status(404).json({ error: "Error registering user" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ error: "Must provide username and password to register" });
  } else {
    try {
      const user = await Users.findBy({ username });

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}, here is your token`,
          token,
          username: user.username
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  }
}

async function getUsers(req, res) {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
}

async function getUsersById(req, res) {
  const id = req.params.id;
  try {
    const user = await Users.get(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
