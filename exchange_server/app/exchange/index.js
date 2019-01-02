import io from 'socket.io'
import {OrderBook} from '../orderbook';
import { throws } from 'assert';

class Exchange {

  constructor() {
    this.orderMap = new Map();
    this.symOrderMap = new Map();
    this.orderBook = new OrderBook();
    this.socketMap = new Map();
    this.orderToToken = new Map();
    this.tokenId = 1;
    this.orderId = 1;

    this.orderMap.set('eth-eos',['tes','dsdds']);
  }

  start() {
    let server = io.listen(5000);
    console.log('Listen port 5000');

    this.orderBook.on('processed', (orderStatus) => {
      console.log(orderStatus);
      const { firstOrderId, secondOrderId } = this.this.orderStatus;
      const tokenFirst = this.orderToToken.get(firstOrderId);
      const tokenSecond = this.orderToToken.get(secondOrderId);

      const socketFirst = this.socketMap.get(tokenFirst);
      const socketSecond = this.socketMap.get(tokenSecond);

      socketFirst.emit('ORDER_FINISHED', orderStatus);
      socketSecond.emit('ORDER_FINISHED', orderStatus);

    })

    server.sockets.on('connection', (socket) => {
      socket.on('AUTH_USER', (msg, callback) => {
        this.tokenId+=1;
        this.socketMap.set(this.tokenId, socket);
        callback(this.tokenId);
      })

      socket.on('GET_LIST', (msg, callback) => {
        console.log(msg);
        const orders = this.orderMap.get(msg.pair);
        console.log(callback);
        callback(orders);
      });

      socket.on('SELL_ORDER', (msg, callback) => {
        const token = msg.token;
        msg.orderId = this.orderId++;
        this.orderToToken.set(this.orderId, token);
        console.log(msg);
        this.putSellOrder(msg);
      });

      socket.on('BUY_ORDER', (msg, callback) => {
        msg.orderId = this.orderId++;
        this.putBuyOrder(msg);
      });
      
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
} 

export default new Exchange();