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
}

export default new OrderService();