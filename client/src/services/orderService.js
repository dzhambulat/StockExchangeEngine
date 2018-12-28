import io from 'socket.io-client';

class OrderService {
  init() {
    this.socket = io.connect('localhost:5000', {reconnect: true});
        this.socket.on('connect', function (socket) {
            console.log('Connected!');
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

  sendBuyOrder(pair, order, callback, fail) {
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