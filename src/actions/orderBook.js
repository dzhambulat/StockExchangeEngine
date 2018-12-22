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
function finishOrder(value) {
  return {
    type: 'SET_SELL_ORDER_FINISHED',
    value: value
  }
}

// when order fails
function failSellOrder() {
  return {
    type: 'SET_SELL_ORDER_FAIL'
  }
}

function buyOrder(value) {
  return {
    type: 'SET_BUY_ORDER',
    value: value
  }
}

// when order is success 
function finishBuyOrder(value) {
  return {
    type: 'SET_BUY_ORDER_FINISHED',
    value: value
  }
}

// when order fails
function failBuyOrder() {
  return {
    type: 'SET_BUY_ORDER_FAIL'
  }
}

export function fetchOrders(symbolPair) {
  return function(dispatch) {
    dispatch(getOrdersList());

    dispatch(setOrderList(['test','test1','test2']));
  }
}

export function makeSellOrder(value) {
  return function(dispatch) {
    dispatch(sellOrder(value));

    dispatch(finishOrder(value));
  }
}

export function makeBuyOrder(value) {
  return function(dispatch) {
    dispatch(buyOrder(value));

    dispatch(finishBuyOrder(value));
  }
}