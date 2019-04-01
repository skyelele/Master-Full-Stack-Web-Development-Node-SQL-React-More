import React, { Component } from "react";
// In order for the Generation component to use
// the store via props, you need to import
// the connect module from react-redux;
import { connect } from "react-redux";

const DEFAULT_GENERATION = { generationId: "", expiration: "" };

const MINIMUM_DELAY = 3000;

class Generation extends Component {
  state = { generation: DEFAULT_GENERATION };

  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchGeneration = () => {
    fetch("http://localhost:3001/generation")
      .then(response => response.json())
      .then(json => {
        console.log("json", json);

        // Always use setState() function
        // to update a state in React :) <3
        this.setState({ generation: json.generation });
      })
      .catch(error => console.error("error", error));
  };

  fetchNextGeneration = () => {
    this.fetchGeneration();

    let delay =
      new Date(this.state.generation.expiration).getTime() -
      new Date().getTime();

    if (delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY;
    }

    this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
  };

  render() {
    // this.state.generation
    const { generation } = this.props;

    return (
      <div>
        <h3>Generation {generation.generationId}. Expires on:</h3>
        <h4>{new Date(generation.expiration).toString()}</h4>
      </div>
    );
  }
}

// state = incoming state from REDUX :)
const mapStateToProps = state => {
  const generation = state.generation;

  return { generation };
  // Enables you to use this.props.generation
  // to access state.generation :)
};

const componentConnector = connect(mapStateToProps);

// Takes entire Generation component class
// as an argument, and as a result,
// this now returns another component that has
// redux properties mixed into it.
export default componentConnector(Generation);

// Now, the generation component has access to
// the data from the Redux store through
// this.props

// We can now use the generation from the
// REDUX STATE and not the LOCAL STATE
// like we coded before without importing
// / utilizing redux.
