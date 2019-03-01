import React from "react";
import axios from "axios";

class Jokes extends React.Component {
  state = { jokes: [] };

  async componentDidMount() {
    const jokes = await axios.get("http://localhost:3300/api/jokes");

    this.setState({ jokes: jokes.data });
  }

  render() {
    const { jokes } = this.state;
    if (!jokes) {
      return null;
    }

    return (
      <div className="jokes-container">
        <ul className="joke-list">
          {jokes.map(({ id, joke }) => (
            <li key={id}>{joke}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Jokes;
