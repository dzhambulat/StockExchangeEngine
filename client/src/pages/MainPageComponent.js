import React from "react";
import { connect } from "react-redux";
import OrderPanelComponent from '../components/OrderPanelComponent'
import HistoryPanelComponent from "../components/HistoryRatesComponent";

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
      <div>
        <OrderPanelComponent actions = {this.props.actions}/>
        <HistoryPanelComponent/>
        </div>
    );
  }
}

export default MainPageComponent;