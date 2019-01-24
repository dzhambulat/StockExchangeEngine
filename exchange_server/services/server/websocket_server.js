import io from 'socket.io'
import EventEmmiter from 'events';

class Server extends EventEmmiter {
  constructor() {
    this.start = this.start.bind(this);
    this.initializeCommands = this.initializeCommands.bind(this);
  }

  start() {
    this.server = io.listen(5000);
    console.log('Listen port 5000');
    initializeCommands();
  }

  initializeCommands() {
    this.server.sockets.on('connection', (socket) => {
      socket.on('AUTH_USER', (msg, callback) => {
        this.tokenId+=1;
        this.socketMap.set(this.tokenId, socket);
        callback(this.tokenId);
      })

      socket.on('GET_LIST', (msg, callback) => {
        console.log(msg);
        this.emit('getList', {pair: msg.pair, callback})
        const orderBook = this.orderMap.get(msg.pair);
        const orders = orderBook.getOrders();
        console.log(callback);
        callback(orders);
      });

      socket.on('SELL_ORDER', (msg, callback) => {
        const token = msg.token;
        console.log('token', token);
        this.emit('sell_order', msg);
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
}