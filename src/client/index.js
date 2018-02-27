import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth.jsx';
import Dashboard from './components/Dashboard.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './style.scss';

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
