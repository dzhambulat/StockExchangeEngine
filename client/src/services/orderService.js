import io from 'socket.io-client';
import EventEmmiter from 'events';

class OrderService extends EventEmmiter {
  init() {
    this.socket = io.connect('localhost:5000', {reconnect: true});
    this.socket.on('connect', (socket) => {
        console.log('Connected!');
        this.socket.emit('AUTH_USER', {}, (data) => {
          this.token = data.tokenId;
        });

        this.socket.on('ORDER_FINISHED', (data) => {
          alert(data);
        })
      })
  }

  getOrderList(pair, callback) {
    this.socket.emit('GET_LIST', { pair }, (data) => {
      callback(data);
    })
  }

  sendSellOrder(order, callback, fail) {
    try {
      this.socket.emit('SELL_ORDER', order, (data) => {
        callback(data);
      })
    }
    catch (e) {
      fail(e);
    }
  }

  sendBuyOrder(order, callback, fail) {
    try {
      this.socket.emit('BUY_ORDER', order, (data) => {
        callback(data);
      })
    }
    catch (e) {
      fail(e);
    }
  }
}

export default new OrderService();