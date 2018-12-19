import React from "react";
import { connect } from "react-redux";

@connect(
  (store) => {
    return {
      orderBook: store.orderBook
    }
  }
)
class MainPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

  }

  /**
   *
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {

  }


  /**
   *
   */
  componentWillUnmount() {
  }

  /**
   *
   */

  render() {
    return (
      <div class="order_panel">
        <div class="rate">
            434334433443
          </div>
        <div class="order_list">
            <div>
              sdsdds
              </div>
            <div>
              dssdsdds
              </div>
          </div>
        <div class="control_order">
          <button>Sell</button>
          <button onClick={this.props.actions.getOrders}>Buy</button>
        </div>
        </div>
    );
  }
}

export default MainPageComponent;