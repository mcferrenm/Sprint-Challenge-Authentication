import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import Jokes from "./components/Jokes";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute"

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to="/jokes">Jokes</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </nav>
        </header>
        <main>
          {/* <Route path="/jokes" component={Jokes} /> */}
          <ProtectedRoute path="/jokes" component={Jokes} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </main>
      </div>
    );
  }
}

export default App;
