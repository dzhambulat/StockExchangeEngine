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

    this.orderMap.set('eth-eos',this.orderBook);
  }

  start() {
    let server = io.listen(5000);
    console.log('Listen port 5000');

    this.orderBook.on('processed', (orderStatus) => {
      console.log('processed');
      console.log(orderStatus);
      const { firstOrderId, secondOrderId } = orderStatus;
      const tokenFirst = this.orderToToken.get(firstOrderId);
      const tokenSecond = this.orderToToken.get(secondOrderId);
      console.log(tokenFirst);
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
        const orderBook = this.orderMap.get(msg.pair);
        const orders = orderBook.getOrders();
        console.log(callback);
        callback(orders);
      });

      socket.on('SELL_ORDER', (msg, callback) => {
        const token = msg.token;
        console.log('token', token)
        msg.orderId = this.orderId++;
        this.orderToToken.set(msg.orderId, token);
        console.log(msg);
        this.putSellOrder(msg);
      });

      socket.on('BUY_ORDER', (msg, callback) => {
        const token = msg.token;
        msg.orderId = this.orderId++;
        this.orderToToken.set(msg.orderId, token);
        console.log('BUY_ORDER');
        this.putBuyOrder(msg);
      });
      
      socket.on('disconnect', function() {

      });
    });
  }

  putBuyOrder({amount, price, orderId}) {
    this.orderBook.putBuyOrder({
      price,
      orderId,
      count: amount
    })
  }

  putSellOrder({amount, price, orderId}) {
    this.orderBook.putSellOrder({
      price,
      orderId,
      count: amount
    })
  }
} 

export default new Exchange();