import React from "react";
import { connect } from "react-redux";
import OrderPanelComponent from '../components/OrderPanelComponent'

class MainPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  
  componentWillUnmount() {
  }

  render() {
    return (
      <OrderPanelComponent actions = {this.props.actions}/>
    );
  }
}

export default MainPageComponent;