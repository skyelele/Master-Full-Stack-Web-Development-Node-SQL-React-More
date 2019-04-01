import React, { Component } from "react";
// In order for the Generation component to use
// the store via props, you need to import
// the connect module from react-redux;
import { connect } from "react-redux";
import { generationActionCreator } from "../actions/generation";

const MINIMUM_DELAY = 3000;

class Generation extends Component {
  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchNextGeneration = () => {
    this.props.fetchGeneration();

    let delay =
      new Date(this.props.generation.expiration).getTime() -
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
  // from the redux store.
};

const componentConnector = connect(
  mapStateToProps,
  { fetchGeneration }
);

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
