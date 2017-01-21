import React, { Component } from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import ContextComponent from './components/ContextComponent';
import DashboardView from './views/DashboardView';
import DeployView from './views/DeployView';
import Login from './views/Login';
import cookie from 'react-cookie';




class App extends Component {


function redirectIfLoggedIn(nextState, replace, next) {
  const token = cookie.load('token');
  if(token) {
      replace('/DashboardView');
  }
  next();
}
function redirectIfNotLoggedIn(nextState, replace, next) {
  const token = cookie.load('token');
  if(!token) { replace('/'); }
  next();
}



  render() {
    return (
      <Router history={hashHistory}>
       
        <Route path="/" component={Login} onEnter={redirectIfLoggedIn}  />
        <Route path="app" component={ContextComponent} onEnter={redirectIfNotLoggedIn}  >
          <IndexRoute component={DashboardView} />
          <Route path="/app/deploy" component={DeployView} onEnter={redirectIfNotLoggedIn} />
        </Route>
        </Router>
        );
  }
}

export default App;
