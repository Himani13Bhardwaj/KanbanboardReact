import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route, Switch, IndexRoute} from 'react-router-dom';
import App from './App.js';


ReactDom.render(
	<BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('app'));