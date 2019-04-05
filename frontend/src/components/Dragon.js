import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { fetchDragon } from "../actions/dragon";
import fetchStates from "../reducers/fetchStates";

class Dragon extends Component {
  get DragonView() {
    const { dragon } = this.props;

    if (dragon.status === fetchStates.error) {
      return <span>{dragon.message}</span>;
    }

    return <DragonAvatar dragon={dragon} />;
  }

  render() {
    return (
      <div>
        <Button onClick={fetchDragon}>New Dragon</Button>
        {this.DragonView}
      </div>
    );
  }
}

export default connect(
  // mapstatetoprops
  // mapping only dragon
  ({ dragon }) => ({ dragon }),
  // mapdispatchtoprops
  // mapping only fetchdragon method
  { fetchDragon }
)(Dragon);
