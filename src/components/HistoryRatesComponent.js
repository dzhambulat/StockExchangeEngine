import React from "react";
import { connect } from "react-redux";

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
  }

  componentWillUnmount() {
  }

  render() {

    return (
      <div class="history_panel">

        </div>
    );
  }
}

export default HistoryPanelComponent;