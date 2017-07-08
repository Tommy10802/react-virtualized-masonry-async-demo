import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const width = document.documentElement.clientWidth
const height = document.documentElement.clientHeight

const defaultProps = {
  width,
  height,
  rows: 3,
  gut: 25
}
ReactDOM.render(<App {...defaultProps} />, document.getElementById('root'));
registerServiceWorker();
