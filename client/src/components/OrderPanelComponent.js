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
    if(!isNaN(e.target.value)) {
      this.setState({
        [e.target.id]:e.target.value
      })
    } 
    else {
      this.setState((prevState) => {return prevState});
    }
  }

  sell() {
    if(isNaN(parseInt(this.state.sellAmount)) || isNaN(parseInt(this.state.sellPrice))) {
      return;
    }

    const order = {
      pair: this.ratePair,
      amount: this.state.sellAmount,
      price: this.state.sellPrice
    }
    this.actions.setSellOrder(order);
  }

  buy() {
    if(isNaN(parseInt(this.state.buyAmount)) || isNaN(parseInt(this.state.buyPrice))) {
      return;
    }

    const order = {
      pair: this.ratePair,
      amount: this.state.buyAmount,
      price: this.state.buyPrice
    }
    this.actions.setBuyOrder(order);
  }

  render() {
    let orderList = this.props.orderBook.collection.map((order, i) => {
<<<<<<< HEAD
      return <div key={'order'+i}> <p>{order.amount}</p> </div>
=======
      return <div key={'order'+i}> {order} </div>
>>>>>>> parent of 156dc4e4... add test history component data
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
            <input type='text' id='sell_amount' placeholder='Amount' onChange={this.textChange.bind(this)} value={this.state.sell_amount}/>
            <input type='text' id='sell_price' placeholder='Price' onChange={this.textChange.bind(this)} value={this.state.sell_price}/>
          </div>
          <div className="order_input"> 
            <button onClick={this.buy.bind(this)}>Buy</button>
            <input type='text' id='buy_amount' onChange={this.textChange.bind(this)} value={this.state.buy_amount}/>
            <input type='text' id='buy_price' onChange={this.textChange.bind(this)} value={this.state.buy_price}/>
          </div>
        </div>
        </div>
    );
  }
}

export default OrderPanelComponent;