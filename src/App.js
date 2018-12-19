import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { connect } from "react-redux";
import MainPageComponent from './pages/MainPageComponent'
import './App.css';

@connect(
  (store) => {
    return {
      user: store.user,
      main: store.main
    }
  },
  (dispatch) => {
    return {
      orderBookActions: {
        getOrders: (symbol) => {
         // dispatch(fetchItem(uuid))
        },
      }
    }
  }
)
class App extends Component {
  render() {
    return (
    <Router>
      <Switch>
        <Route path='/' component={MainPageComponent} />
      </Switch>
    </Router>
    );
  }
}

export default App;
