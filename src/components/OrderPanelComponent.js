import React from "react";
import { connect } from "react-redux";

@connect(
  (store) => {
    return {
      orderBook: store.orderBook
    }
  }
)
class OrderPanelComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.actions = this.props.actions;
    this.actions.getOrders('test');
  }
  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
  }

  render() {
    let orderList = this.props.orderBook.collection.map((order) => {
      return <div> {order} </div>
    })
    return (
      <div class="order_panel">
        <div class="rate">
             
          </div>
        <div class="order_list">
         {orderList}
        </div>
        <div class="control_order">
          <button onClick={()=>{this.actions.setSellOrder('new order')}}>Sell</button>
          <button onClick={()=>{this.actions.setBuyOrder('buy order')}}>Buy</button>
        </div>
        </div>
    );
  }
}

export default OrderPanelComponent;