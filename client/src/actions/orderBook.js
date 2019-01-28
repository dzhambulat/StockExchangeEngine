import orderService from '../services/orderService'

export function getOrdersList() {
  return {
    type: 'GET_ORDER_LIST'
  }
}

function setOrderList(collection) {
  return {
    type: 'GET_ORDER_LIST_FINISHED',
    collection: collection
  }
}

function failOrderList() {
  return {
    type: 'GET_ORDER_LIST_FAIL'
  }
}


function sellOrder(value) {
  return {
    type: 'SET_SELL_ORDER',
    value: value
  }
}

// when order is success 
function finishSellOrder(value) {
  return {
    type: 'SET_SELL_ORDER_FINISHED',
    value: value
  }
}

// when order fails
function failSellOrder(error) {
  return {
    type: 'SET_SELL_ORDER_FAIL',
    error: error
  }
}

function buyOrder(value) {
  return {
    type: 'SET_BUY_ORDER',
    value: value
  }
}

// when order is success 
function finishBuyOrder() {
  return {
    type: 'SET_BUY_ORDER_FINISHED'
  }
}

// when order fails
function failBuyOrder(error) {
  return {
    type: 'SET_BUY_ORDER_FAIL',
    error: error
  }
}

export function fetchOrders(symbolPair) {
  return function(dispatch) {
    dispatch(getOrdersList(symbolPair));
    orderService.getOrderList(symbolPair, (data) => {
      dispatch(setOrderList(data));
    })
  }
}

export function makeSellOrder(order) {
  return function(dispatch) {
    dispatch(sellOrder(order));
    orderService.sendSellOrder(order, (data) => {
      dispatch(finishSellOrder(data));
    }, (e) => {
      dispatch(failSellOrder(e));
    })
  }
}

export function makeBuyOrder(order) {
  return function(dispatch) {
    dispatch(buyOrder(order));
    orderService.sendSellOrder(order, (data) => {
      dispatch(finishBuyOrder(data));
    }, (e) => {
      dispatch(failBuyOrder(e));
    })
  }
}