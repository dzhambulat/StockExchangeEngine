import io from 'socket.io'

class Exchange {

  constructor() {
    this.orderMap = new Map();
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
      socket.on('disconnect', function() {

      });
    });
  }
} 

export default new Exchange();