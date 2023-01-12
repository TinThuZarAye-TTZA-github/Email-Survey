import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './survey/SurveyNew';
// const Landing = () => <h1>Landing</h1>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />

          <Route exact path='/' component={Landing}></Route>
          <Route exact path='/survey' component={Dashboard}></Route>
          <Route path='/survey/new' component={SurveyNew}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
