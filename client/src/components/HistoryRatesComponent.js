import React from "react";
import { connect } from "react-redux";
import * as d3 from "d3";

@connect(
  (store) => {
    return {
    }
  }
)
class HistoryPanelComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.actions = this.props.actions;
    this.drawChart();
  }

  componentWillUnmount() {
  }

  drawChart() {
    
  }
  render() {

    return (
      <div className="history_panel">

        </div>
    );
  }
}

export default HistoryPanelComponent;