const orderBook = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ORDER_LIST':
      return {
        ...state,
        list: action.list
      }
    case 'BUY_ORDER':
      return {

      }
    case 'SELL_ORDER':
      return {

      }
    default:
      return state
  }
}

export default orderBook