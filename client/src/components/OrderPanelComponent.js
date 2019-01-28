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
      return <div key={'order'+i}> <p>{order.amount}</p> </div>
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
            <input type='text' id='sellAmount' placeholder='Amount' onChange={this.textChange.bind(this)} value={this.state.sellAmount}/>
            <input type='text' id='sellPrice' placeholder='Price' onChange={this.textChange.bind(this)} value={this.state.sellPrice}/>
          </div>
          <div className="order_input"> 
            <button onClick={this.buy.bind(this)}>Buy</button>
            <input type='text' id='buyAmount' onChange={this.textChange.bind(this)} value={this.state.buyAmount}/>
            <input type='text' id='buyPrice' onChange={this.textChange.bind(this)} value={this.state.buyPrice}/>
          </div>
        </div>
        </div>
    );
  }
}

export default OrderPanelComponent;