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
    this.actions.fetchOrders('eth-eos');
  }
  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
  }

  render() {
    let orderList = this.props.orderBook.collection.map((order, i) => {
      return <div key={'order'+i}> {order} </div>
    })
    return (
      <div className="order_panel">
        <div className="rate">
             
          </div>
        <div className="order_list">
         {orderList}
        </div>
        <div className="control_order">
          <button onClick={()=>{this.actions.setSellOrder('new order')}}>Sell</button>
          <button onClick={()=>{this.actions.setBuyOrder('buy order')}}>Buy</button>
        </div>
        </div>
    );
  }
}

export default OrderPanelComponent;