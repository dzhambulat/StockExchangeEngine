import io from 'socket.io'
import {OrderBook} from '../orderbook';

class Exchange {

  constructor() {
    this.orderMap = new Map();
    this.symOrderMap = new Map();
    this.orderBook = new OrderBook();
    
    this.orderMap.set('eth-eos',['tes','dsdds']);
  }

  start() {
    let server = io.listen(5000);
    console.log('Listen port 5000');
    server.sockets.on('connection', (socket) => {
      socket.on('GET_LIST', (msg, callback) => {
        console.log(msg);
        const orders = this.orderMap.get(msg.pair);
        console.log(callback);
        callback(orders);
      });
      socket.on('SELL_ORDER', (msg, callback) => {
        this.putSellOrder(msg)
      });
      socket.on('BUY_ORDER', (msg, callback) => {
        this.putBuyOrder(msg);
      })
      socket.on('disconnect', function() {

      });
    });
  }

  putBuyOrder({firstSymbol, secondSymbol, amount, price}) {
    this.orderBook.putBuyOrder({
      price,
      count: amount
    })
  }

  putSellOrder({firstSymbol, secondSymbol, amount, price}) {
    this.orderBook.putSellOrder({
      price,
      count: amount
    })
  }

  putOrder({firstSymbol, secondSymbol, firstSymbolAmount, secondSymbolAmount}) {

  }
} 

export default new Exchange();