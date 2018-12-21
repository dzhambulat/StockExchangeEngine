import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchOrders, makeSellOrder } from "./actions/orderBook"
import MainPageComponent from './pages/MainPageComponent'

import './sass/main.scss';

@connect(
  (store) => {
    return {
    }
  },
  (dispatch) => {
    return {
      orderBookActions: {
        getOrders: (sympolPair) => {
          dispatch(fetchOrders(sympolPair));
        },
        setBuyOrder: (value) => {
          
        },
        setSellOrder: (value) => {
          dispatch(makeSellOrder(value));
        }
      }
    }
  }
)
class App extends Component {
  
  render() {
    const MainPage = ({match}) => {
      return (
        <MainPageComponent actions = {this.props.orderBookActions}/>
      )
    }

    return (
    <Router>
      <Switch>
        <Route path='/' component={MainPage} />
      </Switch>
    </Router>
    );
  }
}

export default App;
