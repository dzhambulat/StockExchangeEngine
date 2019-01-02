import PriorityQueue from 'priorityqueue';
import EventEmmiter from 'events';

export class OrderError
{

}

export class OrderBook extends EventEmmiter
{
    
    constructor() {
        super();
        console.log("Orders");
        this.sell_orders = PriorityQueue({comparator: (a, b)=>
            b.price - a.price 
        });
        this.buy_orders = PriorityQueue({comparator: (a, b)=>
            a.price - b.price 
        });
    }

    checkOrder(order) {
        return true;
    }

    makeExchangeResult(count,price)
    {
        return { count, price }
    }

    makeExchange()
    {
        let buyOrder = this.buy_orders.top();
        let sellOrder = this.sell_orders.top();
        const exchangeResult = [];
        exchangeResult.status = false;

        if(!buyOrder || !sellOrder) {
          return exchangeResult;
        }
        
        while (buyOrder && sellOrder && buyOrder.price >= sellOrder.price)
        {
          exchangeResult.status = true;
          if (buyOrder.count <= sellOrder.count) {
            exchangeResult.push(this.makeExchangeResult(buyOrder.count, sellOrder.price))
            this.buy_orders.pop();
            sellOrder.count -=buyOrder.count;
            if (sellOrder.count === 0) {
              this.sell_orders.pop();
            }
          }
          else {
              exchangeResult.push(this.makeExchangeResult(sellOrder.count, sellOrder.price));
              buyOrder.count -= sellOrder.count;
              this.sell_orders.pop();
          }
          buyOrder = this.buy_orders.top();
          sellOrder = this.sell_orders.top();
      }

      return exchangeResult;
    }

    putSellOrder(order){
        if (!this.checkOrder(order))
        {
            throw new OrderError();
        }

        this.sell_orders.push(order);
        const orderResult = this.makeExchange();
        if (orderResult.status === true) {
          process.nextTick(function (data) {
            this.emit('processed',data);
          }.bind(this), orderResult);
        }
    }

    putBuyOrder(order) {
        if (!this.checkOrder(order))
        {
            throw new OrderError();
        }

        this.buy_orders.push(order);
        const orderResult = this.makeExchange();
        if (orderResult.status === true) {
          process.nextTick(function (data) {
            this.emit('processed',data);
          }.bind(this), orderResult);
        }
    }
}