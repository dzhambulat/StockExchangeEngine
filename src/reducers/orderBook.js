const initialState = {
  collection: []
}
const orderBook = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDER_LIST':
      return {
        ...state,
        beginList: true,
      }
    case 'GET_ORDER_LIST_FINISHED':
      return {
        ...state,
        beginList: false,
        collection: action.collection,
        successList: true
      }
    case 'GET_ORDER_LIST_FAIL':
      return {
        ...state,
        beginList: false,
        successList: false
      }
    case 'SET_BUY_ORDER':
      return {
        ...state,
        success: false,
        value : action.value,
        buyBegin: true
      }
    case 'SET_BUY_ORDER_FINISHED':
      return {
        ...state,
        success: true,
        buyBegin: false
      }
    case 'SET_BUY_ORDER_FAIL':
      return {
        ...state,
        success: false,
        buyBegin: false
      }
    case 'SET_SELL_ORDER':
      return {
        ...state,
        success: false,
        value : action.value,
        sellBegin: true
      }
    case 'SET_SELL_ORDER_FINISHED':
      let collection = [...state.collection, action.value];
      return {
        ...state,
        success: true,
        sellBegin: false,
        collection: collection
      }
    case 'SET_SELL_ORDER_FAIL':
      return {
        ...state,
        success: false,
        sellBegin: false
      }
    default:
      return state
  }
}

export default orderBook