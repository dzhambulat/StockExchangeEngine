import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { connect } from "react-redux";
import {setOrdersList} from "./actions/orderBook"
import MainPageComponent from './pages/MainPageComponent'

import './sass/main.scss';

@connect(
  (store) => {
    return {
      orderBook: store.orderBook
    }
  },
  (dispatch) => {
    return {
      orderBookActions: {
        getOrders: (symbol) => {
          alert(symbol);
          dispatch(setOrdersList(['Orders']))
        },
      }
    }
  }
)
class App extends Component {
  render() {
    const MainPage = () => {
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
