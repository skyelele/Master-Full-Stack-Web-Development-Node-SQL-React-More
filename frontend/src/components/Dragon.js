import React, { Component } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";

const DEFAULT_DRAGON = {
  dragonId: "",
  generationId: "",
  nickname: "",
  birthdate: "",
  traits: []
};

class Dragon extends Component {
  state = { dragon: DEFAULT_DRAGON };

  componentDidMount = () => {
    this.fetchDragon();
  };

  fetchDragon = () => {
    fetch("http://localhost:3001/dragon/new")
      .then(response => response.json())
      .then(json => this.setState({ dragon: json.dragon }))
      .catch(error => console.error("error", error));
  };

  render() {
    // Passing props data as keys to the component
    // itself, just like HTML attributes

    // In the child component, you use
    // this (the main component) .
    // props (to inherit the dragon={this.state.dragon}) .
    // dragon
    // in order to destructure
    // key/value pairs from the
    // dragon state.
    return (
      <div>
        <Button onClick={this.fetchDragon}>New Dragon</Button>
        <DragonAvatar dragon={this.state.dragon} />;
      </div>
    );
  }
}

export default Dragon;
