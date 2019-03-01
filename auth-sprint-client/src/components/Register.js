import React from "react";
import axios from "axios";

class Register extends React.Component {
  state = { username: "mary", password: "pass" };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  register = async e => {
    e.preventDefault();

    const user = await axios.post(
      "http://localhost:3300/api/register",
      this.state
    );
    if(user && user.data && user.data.token) {
      localStorage.setItem("jwt", user.data.token)

      this.props.history.push("/jokes")
    }

  };
  render() {
    return (
      <div className="register-container">
        <form onSubmit={this.register}>
          <div>
            <label htmlFor="username">username:</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
              id="username"
            />
            <label htmlFor="password">password:</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              id="password"
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
