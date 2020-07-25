import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthHelper from './Components/Helpers/authHelper';

ReactDOM.render(
  <React.StrictMode>
    <AuthHelper>
      <App />
    </AuthHelper>
  </React.StrictMode>,
  document.getElementById('root')
);
