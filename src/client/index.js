import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth/Auth.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const isDashboard = window.location.pathname == '/dashboard';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route path="/login" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
