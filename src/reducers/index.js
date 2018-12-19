import { combineReducers } from 'redux'
import orderBook from './orderBook'

const stockExchange = combineReducers(orderBook);

export default stockExchange;