import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Home from './page/Home';

import './styles/index.scss';

ReactDOM.render(
  <Home/>,
  document.getElementById('react-root')
)