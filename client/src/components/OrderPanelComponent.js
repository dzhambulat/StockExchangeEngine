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
    this.ratePair = {
      first: 'eth',
      second: 'eos'
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

  textChange(e) {
    this.setState({
      [e.target.id]:e.target.value
    })
  }

  sell() {
    const order = {
      pair: this.ratePair,
      sellAmount: this.state.sellAmount,
      sellPrice: this.state.sellPrice
    }
    this.actions.setSellOrder(order);
  }

  buy() {
    const order = {
      pair: this.ratePair,
      buyAmount: this.state.buyAmount,
      buyPrice: this.state.buyPrice
    }
    this.actions.setBuyOrder(order);
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
          <div className="order_input">
            <button onClick={this.sell.bind(this)}>Sell</button>
            <input type='text' id='sell_amount' placeholder='Amount' onChange={this.textChange.bind(this)}/>
            <input type='text' id='sell_price' placeholder='Price' onChange={this.textChange.bind(this)}/>
          </div>
          <div className="order_input"> 
            <button onClick={this.buy.bind(this)}>Buy</button>
            <input type='text' id='buy_amount' onChange={this.textChange.bind(this)}/>
            <input type='text' id='buy_price' onChange={this.textChange.bind(this)}/>
          </div>
        </div>
        </div>
    );
  }
}

export default OrderPanelComponent;