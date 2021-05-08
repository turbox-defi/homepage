import React from 'react';
import ReactDOM from 'react-dom';
// import ReactGA from 'react-ga';
import './index.css';
import App from './App';



ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactGA.initialize('UA-171768951-1');
// ReactGA.pageview(window.location.pathname + window.location.search);


window.goExChange = () => {
  const url = `http://exchange.turbox.io`;
  window.location.href = url;
}